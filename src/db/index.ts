import { DB } from './types';
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';

const port = process.env.DB_PORT || '5432'; 

const dialect = new PostgresDialect({
  pool: new Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    port: parseInt(port)
  }),
})

export const db = new Kysely<DB>({
  dialect,
})

export default db