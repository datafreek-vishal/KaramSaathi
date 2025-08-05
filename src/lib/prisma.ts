import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Only create Prisma client if not in build mode
export const prisma = globalForPrisma.prisma ?? 
  (process.env.NODE_ENV !== 'production' || process.env.DATABASE_URL 
    ? new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
      })
    : new PrismaClient())

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
