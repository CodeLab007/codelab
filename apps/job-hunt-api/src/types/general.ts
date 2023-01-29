import { UserType } from './model-types';

export interface IAuthAttrs {
  id?: number;
  email: string;
  password: string;
  type: UserType;
  verified: boolean;
  Users?: any[];
  Companies: any[];
}

export interface IAuthModel extends IAuthAttrs {
  verified: boolean;
}

export interface CustomError extends Error {
  status?: number;
}

declare global {
  namespace Express {
    export interface Request {
      user: IAuthModel;
      formattedFiles?: string[];
      header: object;
      userType:UserType
    }
  }
}

// export enum Types {
//   User = 1,
//   Admin,
//   SuperAdmin,
// }

export interface MyToken {
  email?: string;
  type?: UserType;

}

export function verifyDecodedToken(data: unknown, field = 'email'): asserts data is MyToken {
  if (!(data instanceof Object)) throw new Error('Decoded token error. Token must be an object');

  if (!(field in data)) throw new Error(`Decoded token error. Missing required field "${field}"`);

  // other necessary checks
}

export interface AnyObj {
  [key: string]: any;
}
