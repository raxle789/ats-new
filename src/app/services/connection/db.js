import config from './config';

const pool = require('./connect');

export default async function getDb(poolName) {
  const db = await pool?.get(poolName, config);

  return db;
}
