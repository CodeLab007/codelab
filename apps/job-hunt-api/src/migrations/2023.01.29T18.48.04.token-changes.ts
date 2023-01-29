import type { Migration } from '../umguz';
import { DataTypes, Sequelize } from 'sequelize';

export const up: Migration = async ({ context }: { context: Sequelize }) => {
  await context.getQueryInterface().addColumn('Tokens', 'AuthId', {
    type: DataTypes.INTEGER,
    references: {
      model: 'Auth',
      key: 'id',
    },
  });
};

export const down: Migration = async ({ context }: { context: Sequelize }) => {
  await context.getQueryInterface().dropTable('Tokens');
};
