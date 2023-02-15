import type { Migration } from '../umguz';
import { DataTypes, Sequelize } from 'sequelize';

export const up: Migration = async ({ context }: { context: Sequelize }) => {
  await context.getQueryInterface().createTable('Jobs', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descriptionShort: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descriptionLong: {
      type: DataTypes.TEXT,
    },
    requirements: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiryDate:{
      type:DataTypes.DATE,
      allowNull:false
    },
    salary:{
      type:DataTypes.FLOAT,
      allowNull:false
    },
    experience:{
      type:DataTypes.STRING,
      allowNull:false
    },
    employementType:{
      type:DataTypes.STRING,
      allowNull:false
    },
    projectLength:{
      type:DataTypes.STRING,
      allowNull:false
    },
    location:{
      type:DataTypes.STRING,
      allowNull:false
    },
    CompanyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Companies',
        key: 'id',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  });
};

export const down: Migration = async ({ context }: { context: Sequelize }) => {
  await context.getQueryInterface().dropTable('Jobs');
};
