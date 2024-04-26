// import config from './config';
// import { DataSource } from 'typeorm';

import { PrismaClient } from '@prisma/client';

// const { PrismaClient } = require('@prisma/client');

// const pool = require('./connect');

// export default async function getDb(poolName) {
//   const db = await pool?.get(poolName, config);

//   return db;
// }

// const db = new DataSource(config);

// db.initialize()
//   .then(() => console.info(db.isInitialized))
//   .catch((e) => console.info(e));

// export async function isEstablished() {
//   if (!db.isInitialized) {
//     await db.initialize();
//   }
// }

// export default db;

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }

  prisma = global.prisma;
}

export default prisma;