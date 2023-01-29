import { sequelize } from '../config/db';
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from 'sequelize';

interface TokenModel
  extends Model<InferAttributes<TokenModel>, InferCreationAttributes<TokenModel>> {
  id?: CreationOptional<number>;
  token: string;
  AuthId?:CreationOptional<number>
}
export const Token = sequelize.define<TokenModel>('Token', {
  token: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
