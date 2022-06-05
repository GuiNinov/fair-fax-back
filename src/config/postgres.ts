import dotenv from 'dotenv';
import knex from 'knex';

dotenv.config();

export default {
  connect: () =>
    knex({
      client: 'pg',
      connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DATABASE,
        ssl: { rejectUnauthorized: false },
      },
    }),
};
