import { PrismaClient } from "@prisma/client";
import fs from 'fs';
import path from 'path';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

try {
  const logPath = path.join(process.cwd(), 'debug-log.txt');
  fs.appendFileSync(logPath, `[${new Date().toISOString()}] Prisma Init. DATABASE_URL=${process.env.DATABASE_URL}\n`);
} catch (e) {
  // ignore
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
