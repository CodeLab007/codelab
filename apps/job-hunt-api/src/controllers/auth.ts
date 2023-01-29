import { Token } from '../models/Token';
import { Auth } from '../models/Auth';
import { Request, Response, NextFunction } from 'express';
import { UserType } from '../types/model-types';
import bcrypt from 'bcrypt';
import { AuthError, BadRequestError, CustomError } from '@codelab/api-errors';
import { generateResetPasswordMail, generateVerificationMail } from '../utils/generate-mail';
import jwt from 'jsonwebtoken';
import { verifyDecodedToken } from '../types/general';
import path from 'path';
import fs from 'fs';
import { MailToken } from '../models/MailToken';
import { User } from '../models/User';
import { Company } from '../models/Company';

const jwtMailPublicKey = fs.readFileSync(
  path.join(__dirname, '../config', 'jwt-mail-public.pem'),
  'utf8',
);
const jwtRefreshPublicKey = fs.readFileSync(
  path.join(__dirname, '../config', 'refresh-token.public.pem'),
  'utf8',
);
// ======Register
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { email, contact, password, profileImage = null } = req.body;
    // we get query from FE
    const type = req.query.type as UserType;

    let user;
    let company;
    let auth;

    if (profileImage && req.file?.filename) {
      profileImage = `${process.env.API_URL}media/${req.file.filename}`;
    }

    // check if email exists:
    const existingEmail = await Auth.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (existingEmail) {
      const err = new BadRequestError('email already exists');
      return next(err);
    }

    if (type === UserType.USER) {
      const { firstName, userName, lastName, fullName } = req.body;

      user = await User.create({
        firstName,
        userName,
        lastName,
        fullName,
        email,
        contact,
      });
    } else if (type === UserType.COMPANY) {
      const { name, vatNumber, address, foundationYear } = req.body;
      company = await Company.create({
        name,
        vatNumber,
        address,
        foundationYear,
        email,
        contact,
      });
    }

    auth = await Auth.create(
      {
        email,
        password,
        type: type,
        UserId: type === UserType.USER && user ? user?.id : null,
        CompanyId: type === UserType.COMPANY && company ? company?.id : null,
        profileImage,
      },
      
      { 
        
        include: [
          {
            model: type === UserType.COMPANY ? Company : User,
            attributes: {
              exclude: ['email', 'createdAt', 'updatedAt',],
            },
          },
        ],
      },
    );

    if (auth) {
      const token = await auth.generateMailToken();
      await generateVerificationMail(auth.email, token);
      res.status(201).send({ message: 'Success', data:auth });
    } else {
      const err = new BadRequestError('Bad Request');
      return next(err);
    }
  } catch (error) {
   
    next(error);
  }
};

// ======Verify Email Address
export const verifyEmailAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token=req.query.token as string;

    const options = {
      // @ts-ignore
      issuer: PLATFORM_NAME,
      audience: process.env.DOMAIN,
      expiresIn: process.env.JWT_MAIL_EXPIRY,
      // subject: email as string,
      algorithm: process.env.JWT_HASH_ALGORITHM,
    };
    const payload = jwt.verify(token, jwtMailPublicKey, options);
    verifyDecodedToken(payload);

    const auth = await Auth.findOne({
      where: {
        email: payload.email,
      },
    });

    if (!auth) {
      const err = new BadRequestError('Wrong email password combination');
      return next(err);
    }

    const mailToken = await MailToken.destroy({
      where: {
        token,
        email: auth.email,
      },
    });
   

    if (!mailToken) {
      const err = new BadRequestError("Couldn't verify, please retry again");
      return next(err);
    }
    auth.verified = true;
    await auth.save();

    res.send({
      message: 'Success',
    });
  } catch (err) {
    next(err);
  }
};

//======Signin
export const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    // find user with scope of 'withPassword' so that we can compare passwords otherwise without using scope we won't get password
    
    let user = await Auth.scope('withPassword').findOne({
      where: {
        email,
      },
      attributes: ['id','email', 'password', 'type','verified'],
    });

    // if user is not found
    if (!user) {
      let err = new BadRequestError('Unable to login');
      return next(err);
    }
    // if account is not verified
    
    if (!user?.verified) {
      const err = new AuthError('Please verify your profile');
      return next(err);
    }
    // compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      let err = new BadRequestError('Unable to login');
      return next(err);
    }

    // generate new access and refresh tokens when user signs in
    const accessToken = user.generateJWT();


    const refreshToken = user.generateJWT(process.env.JWT_REFRESH_EXPIRY, 'refresh');

    // save refresh token to database
    await Token.create({
      token: refreshToken,
      AuthId: user.id as number, //authId
    });

    // option for cookies
    const cookieOptions = {
      maxAge: getFormattedExpiry(),
      secure: process.env.NODE_ENV !== 'dev' ? true : false,
      httpOnly: true,
      // domain: 'http://localhost:8080',
    };

    user = await Auth.findOne({
      where: {
        email,
      },
      include: { model: user.type === UserType.COMPANY ? Company : User },
    });
    // sending refresh token to FE using cookies
    res.cookie('refresh_token', refreshToken, cookieOptions);
    // sending data and access_token via response
    res.send({ user, accessToken, message: 'Success' });
  } catch (error) {
    next(error);
  }
};

// =====Refresh Token
export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  // objective : to get new tokens(refresh+access) when acess_token is expired on FE and user wants new acess token based on the refresh_token user provides
  try {
    const { refresh_token } = req.cookies;
    const { user } = req;
    // if no refresh_token provided from user then return with error
    if (!refresh_token) {
      const err = new Error() as CustomError;
      err.message = 'Unauthorised';
      err.status = 401;
      return next(err);
    }
    // verify the given refreshToken
    const refreshTokenPayload = jwt.verify(refresh_token, jwtRefreshPublicKey);

    // return with error if verification failed(token is not valid)
    if (!refreshTokenPayload) {
      res.clearCookie('refresh_token');
      const err = new Error() as CustomError;
      err.message = 'Unauthorised';
      err.status = 401;
      return next(err);
    }

    // find auth id by user email
    const auth = await Auth.findOne({ where: { email: user.email } });

    // if user is not found in auth table based on the email provided return with error
    if (!auth) {
      res.clearCookie('refresh_token');
      const err = new Error() as CustomError;
      err.message = 'Unauthorised';
      err.status = 401;
      return next(err);
    }

    // find the old refresh token which is saved in the database using the token provided by the user in payload and the auth id
    const oldRefreshToken = await Token.findOne({
      where: {
        token: refresh_token,
        AuthId: auth?.id,
      },
    });

    // if no token is found return with error
    if (!oldRefreshToken) {
      res.clearCookie('refresh_token');
      const err = new Error() as CustomError;
      err.message = 'Unauthorised';
      err.status = 401;
      return next(err);
    }

    // generate new refresh & access tokens
    const accessToken = auth.generateJWT();
    const newRefreshToken = auth.generateJWT(process.env.JWT_REFRESH_EXPIRY, 'refresh');

    // replace old refresh token with new one
    oldRefreshToken.token = newRefreshToken;
    await oldRefreshToken.save();

    // setting up cookie options to send to FE side.
    const cookieOptions = {
      maxAge: getFormattedExpiry(),
      secure: process.env.NODE_ENV !== 'dev' ? true : false,
      httpOnly: true,
      // domain: 'http://localhost:8080',
    };

    // sending refresh token in the cookie
    res.cookie('refresh_token', newRefreshToken, cookieOptions);

    // sending access token in the user response
    res.status(200).send({ accessToken, message: 'success' });
  } catch (error) {
    res.clearCookie('refresh_token');
    next(error);
  }
};

// =====Signout
export const signout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refresh_token } = req.cookies;

    if (refresh_token) {
      await Token.destroy({
        where: {
          AuthId: req.user.id,
          token: refresh_token,
        },
      });
    }
    res.clearCookie('refresh_token');
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

// =====Forgot Password
export const resetPasswordMail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    let user;

    user = await Auth.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      const err = new Error() as CustomError;
      err.message = 'Invalid email';
      err.status = 401;
      return next(err);
    }
    const mailToken = await user.generateMailToken();
    generateResetPasswordMail(user.email, mailToken);

    res.send({ message: 'Please check your email to reset password' });
  } catch (error) {
    next(error);
  }
};

// =====Reset Password
export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, password } = req.body;
    const payload = jwt.verify(token, jwtMailPublicKey);
    verifyDecodedToken(payload);

    const user = await Auth.findOne({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      const err = new Error() as CustomError;
      err.message = "Couldn't reset password, please try again";
      err.status = 401;
      return next(err);
    }
    const mailToken = await MailToken.destroy({
      where: {
        token,
        email: user.email,
      },
    });
    if (!mailToken) {
      const err = new Error() as CustomError;
      err.message = "Couldn't reset password, please try again";
      err.status = 401;
      return next(err);
    }

    user.password = password;
    await user.save();
    res.send({ message: 'Success' });
  } catch (err) {
    next(err);
  }
};

// =====Delete Account
export const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    const user = await Auth.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      const err = new BadRequestError('User Not Found');
      return next(err);
    }

    if (user.type === UserType.USER) {
      await User.destroy({
        where: {
          email: user.email,
        },
      });
    } else {
      await Company.destroy({
        where: {
          email: user.email,
        },
      });
    }
    Auth.destroy({
      where: {
        email: user.email,
      },
    });

    res.send({
      message: 'Success',
    });
  } catch (err) {
    next(err);
  }
};

function getFormattedExpiry() {
  const maxAgeInDays = parseInt(process.env.JWT_REFRESH_EXPIRY as string);
  return maxAgeInDays * 24 * 60 * 60 * 1000;
}
