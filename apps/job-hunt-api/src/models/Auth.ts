import { sequelize } from '../config/db';
import bcrypt from 'bcrypt';
import { UserType, AuthType } from '../types/model-types';
import jwt from 'jsonwebtoken';
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from 'sequelize';
import path from 'path';
import fs from 'fs';
import { MailToken } from './MailToken';

// We use private.key to sign JWT and public.key to verify it
const jwtMailPrivateKey = fs.readFileSync(
  path.join(__dirname, '../config', 'jwt-mail-private.pem'),
  'utf8',
);
const jwtAccessPrivateKey = fs.readFileSync(
  path.join(__dirname, '../config', 'access-token.private.pem'),
  'utf8',
);
const jwtRefreshPrivateKey = fs.readFileSync(
  path.join(__dirname, '../config', 'refresh-token.private.pem'),
  'utf8',
);

interface AuthModel extends Model<InferAttributes<AuthModel>, InferCreationAttributes<AuthModel>> {
  id?: CreationOptional<number>;
  email: string;
  password?: CreationOptional<string>;
  type: UserType;
  verified: CreationOptional<boolean>;
  UserId?: CreationOptional<number | null>;
  CompanyId?: CreationOptional<number | null>;
  profileImage: CreationOptional<string | null>;
  authType?: CreationOptional<AuthType>;
}

interface IAuthFunctions extends AuthModel {
  generateMailToken: () => Promise<string>;
  generateJWT: (expiresIn?: string, tokenType?: string) => string;
}
export const Auth = sequelize.define<AuthModel & IAuthFunctions>(
  'Auth',
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        min: {
          args: [6],
          msg: 'Password must be atleast six characters long',
        },
      },
    },
    type: {
      type: DataTypes.ENUM('COMPANY', 'USER'),
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    CompanyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Companies',
        key: 'id',
      },
    },
    profileImage: {
      type: DataTypes.STRING,
    },
    authType: {
      type: DataTypes.STRING,
      defaultValue: 'CUSTOM',
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ['password', 'verified', 'UserId', 'CompanyId'] },
    },
    scopes: {
      withPassword: {
        attributes: [],
      },
      withUserIds: {
        attributes: { exclude: ['password', 'verified'] },
      },
    },
    freezeTableName: true,
  },
);

async function generateHash(user: any) {
  if (user.password) {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, 8);
    }
  }
}

Auth.afterCreate(hideFields);

async function hideFields(user: any) {
  // as in create function we can't add attributes field so this is alternate solution for create method i.e: to run reload() method in afterCreate hook
  await user.reload();
}

Auth.beforeCreate(generateHash);
Auth.beforeUpdate(generateHash);
Auth.beforeBulkCreate(generateHash);
Auth.beforeBulkUpdate(generateHash);

//====== Generate Token
Auth.prototype.generateMailToken = async function () {
  const user = this;

  const payload = { email: user.email, type: user.type };

  const options = {
    // @ts-ignore
    issuer: global.PLATFORM_NAME,
    audience: process.env.DOMAIN,
    expiresIn: process.env.JWT_MAIL_EXPIRY,
    algorithm: process.env.JWT_HASH_ALGORITHM as any,
  };
  // create expirytime
  const dt = new Date();
  const expirytime = (dt.getMilliseconds() + 60 * 60000).toString();

  // create token
  const token = jwt.sign(payload, jwtMailPrivateKey, options);

  // find in MailToken if the token on this email exists
  let userToken = await MailToken.findOne({
    where: {
      email: user.email,
    },
  });
  // if token in the MailToken does not exists add the new token
  if (!userToken) {
    let createdToken = await MailToken.create({ token, expirytime, email: user.email });
    if (createdToken) {
      return token;
    }
  } else if (userToken) {
    // else update token with new token & expiry time
    await MailToken.update(
      {
        token,
        expirytime,
      },
      {
        where: {
          email: user.email,
        },
      },
    );

    return token;
  }
};

Auth.prototype.generateJWT = function (expiresIn = '15m', tokenType = 'access') {
  const user = this;
  let privateKey = jwtAccessPrivateKey;

  if (tokenType === 'refresh') privateKey = jwtRefreshPrivateKey;

  const payload = { id: user.id, type: user.type, email: user.email };

  const options = {
    // @ts-ignore
    issuer: PLATFORM_NAME,
    // subject: user.email,
    audience: process.env.DOMAIN,
    expiresIn,
    algorithm: process.env.JWT_HASH_ALGORITHM as any,
  };
  let token = jwt.sign(payload, privateKey, options);

  return token;
};