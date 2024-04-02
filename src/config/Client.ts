import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv'
dotenv.config()

export const Client = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
})


