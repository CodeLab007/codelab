import { sequelize } from '../config/db';
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

interface MailTokenModel
  extends Model<InferAttributes<MailTokenModel>, InferCreationAttributes<MailTokenModel>> {
  id?: CreationOptional<number>;
  token: string;
  expirytime: string;
  email: string;
}
export const MailToken = sequelize.define<MailTokenModel>(
  'MailToken',
  {
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    expirytime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  },
);
