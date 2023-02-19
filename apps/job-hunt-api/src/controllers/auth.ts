import { Token } from '../models/Token';
import { Auth } from '../models/Auth';
import { MailToken } from '../models/MailToken';
import { User } from '../models/User';
import { Company } from '../models/Company';
import { UserType, AuthType } from '../types/model-types';

import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { AuthError, BadRequestError, CustomError } from '@codelab/api-errors';
import { generateResetPasswordMail, generateVerificationMail } from '../utils/generate-mail';
import { verifyDecodedToken } from '../types/general';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

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
      const { firstName, userName, lastName } = req.body;

      user = await User.create({
        firstName,
        userName,
        lastName,
        fullName: `${firstName} ${lastName}`,
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
              exclude: ['email', 'createdAt', 'updatedAt'],
            },
          },
        ],
      },
    );

    if (auth) {
      const token = await auth.generateMailToken();
      await generateVerificationMail(auth.email, token);
      res.status(201).send({ message: 'Success', data: auth });
    } else {
      const err = new BadRequestError('Bad Request');
      return next(err);
    }
  } catch (error) {
    // next(error);
    res.status(500).send({ message: error });
  }
};

//======Google Signin
export const googleSignin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // we get query from FE
    const type = req.query.type as UserType;

    let { contact, profileImage = null, googleToken } = req.body; //for AUTH and general use
    const { firstName, userName, lastName } = req.body; //for USER
    const { name, vatNumber, address, foundationYear } = req.body; //for COMPANY
    let company;
    let user;
    let authType = AuthType.SOCIAL;
    let auth;

    if (profileImage && req.file?.filename) {
      profileImage = `${process.env.API_URL}media/${req.file.filename}`;
    }

    const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
    });

    // get payload from googleToken
    const payload = ticket.getPayload();

    const email = payload?.email as string;

    auth = await Auth.findOne({
      where: {
        email,
        authType: authType,
      },
      include: { model: type === UserType.COMPANY ? Company : User },
    });

    // user does not exists create new user as per type and also populate auth table
    if (!auth) {
      if (type === UserType.USER) {
        user = await User.create({
          firstName,
          userName,
          lastName,
          fullName: `${firstName} ${lastName}`,
          email,
          contact,
        });
      } else if (type === UserType.COMPANY) {
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
                exclude: ['email', 'createdAt', 'updatedAt'],
              },
            },
          ],
        },
      );

      const token = await auth.generateMailToken();
      await generateVerificationMail(auth.email, token);
      res.status(201).send({ message: 'Success', data: auth });
      return;
    } else {
      // if auth-user already exists
      if (type === UserType.USER && auth.UserId) {
        user = await User.findOne({
          where: {
            email,
            id: auth.UserId,
          },
        });

        if (user) {
          user.firstName = firstName ? firstName : user.firstName;
          user.lastName = lastName ? lastName : user.lastName;
          user.userName = userName ? userName : user.userName;
          if (firstName && lastName) {
            user.lastName = `${firstName} ${lastName}`;
          }
          await user.save();
        }
      } else if (type === UserType.COMPANY && auth.CompanyId) {
        company = await Company.findOne({
          where: {
            email,
            id: auth.CompanyId,
          },
        });
        if (company) {
          company.name = name ? name : company.name;
          company.vatNumber = vatNumber ? vatNumber : company.vatNumber;
          company.address = address ? address : company.address;
          company.foundationYear = foundationYear ? foundationYear : company.foundationYear;
          company.contact = contact ? contact : company.contact;
          await company.save();
        }
      }

      // save auth model values
      auth.profileImage=profileImage?profileImage:auth.profileImage;
      await auth.save();


      // generate new access and refresh tokens when user signs in
      const accessToken = auth.generateJWT();

      const refreshToken = auth.generateJWT(process.env.JWT_REFRESH_EXPIRY, 'refresh');

      // save refresh token to database
      await Token.create({
        token: refreshToken,
        AuthId: auth.id as number, //authId
      });

      // option for cookies
      const cookieOptions = {
        maxAge: getFormattedExpiry(),
        secure: process.env.NODE_ENV !== 'dev' ? true : false,
        httpOnly: true,
        // domain: 'http://localhost:8080',
      };

      // sending refresh token to FE using cookies
      res.cookie('refresh_token', refreshToken, cookieOptions);
      // sending data and access_token via response
      res.send({ user: auth, accessToken, message: 'Success' });
    }
  } catch (error: any) {
    if (error.message) {
      console.log(error.message);
    }
    res.status(500).send({ message: error });
  }
};

// ======Verify Email Address
export const verifyEmailAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.query.token as string;

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
  } catch (error) {
    res.status(500).send({ message: error });
    // next(err);
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
      attributes: ['id', 'email', 'password', 'type', 'verified'],
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
    const isMatch = await bcrypt.compare(password, user.password as string);

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
    res.status(500).send({ message: error });
    // next(error);
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
    // next(error);
    res.status(500).send({ message: error });
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
    // next(error);
    res.status(500).send({ message: error });
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
    // next(error);
    res.status(500).send({ message: error });
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
  } catch (error) {
    // next(err);
    res.status(500).send({ message: error });
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
  } catch (error) {
    // next(err);
    res.status(500).send({ message: error });
  }
};

function getFormattedExpiry() {
  const maxAgeInDays = parseInt(process.env.JWT_REFRESH_EXPIRY as string);
  return maxAgeInDays * 24 * 60 * 60 * 1000;
}