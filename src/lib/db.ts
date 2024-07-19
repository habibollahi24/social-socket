import { PrismaClient } from '@prisma/client';

// class CustomPrismaClient extends PrismaClient {
//   static instanceCount = 0;

//   constructor() {
//     super();
//     CustomPrismaClient.instanceCount++;
//     console.log(`PrismaClient instances: ${CustomPrismaClient.instanceCount}`);
//   }
// }

// declare global {
//   var prisma: CustomPrismaClient | undefined;
// }

// export const db = new CustomPrismaClient();
// export const db = globalThis.prisma || new CustomPrismaClient();

// if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;

//////////////////////////////////

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;

////////////////////////////////////

// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// const db =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ['query', 'info', 'warn', 'error'],
//     errorFormat: 'minimal',
//   });

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

// const db = new PrismaClient();

// export default db;
