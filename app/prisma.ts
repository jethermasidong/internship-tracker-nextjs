import { PrismaClient } from "@prisma/client/extension"; 


const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }