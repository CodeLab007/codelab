import type { Migration } from '../umguz';
import { DataTypes, Sequelize } from 'sequelize';

export const up: Migration = async ({ context }: { context: Sequelize }) => {

  await context.getQueryInterface().changeColumn('Users', 'userName', {
    type: DataTypes.STRING,
    allowNull: false,
  });

};

export const down: Migration = async ({ context }: { context: Sequelize }) => {
  // await context.getQueryInterface().dropTable('Tokens');
  await context.getQueryInterface().removeIndex("Users","Users_userName_key");
};
