import knex, { type Knex } from 'knex';
import config from './knexfile.js';

let instance: Knex | null = null;

export const getDb = (): Knex => {
  if (!instance) {
    instance = knex(config.development);
  }
  return instance;
};
