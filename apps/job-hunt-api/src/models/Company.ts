import { sequelize } from '../config/db';
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
interface CompanyModel extends Model<InferAttributes<CompanyModel>, InferCreationAttributes<CompanyModel>> {
  id?: CreationOptional<number>;
  name: string;
  vatNumber:string;
  address:string;
  foundationYear:number;
  email: string;
  contact: string;
}
export const Company = sequelize.define<CompanyModel>(
  'Company',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vatNumber: {
      type: DataTypes.STRING,
      allowNull:false
    },
    foundationYear: {
      type: DataTypes.STRING,
      allowNull:false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull:false
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
);
