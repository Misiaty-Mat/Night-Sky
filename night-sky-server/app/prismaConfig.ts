import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const gracefulShutdown = async () => {
    await prisma.$disconnect();
    process.exit(0);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

export default prisma;