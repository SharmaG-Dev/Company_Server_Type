import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import { v4 as uuid } from 'uuid'
dotenv.config()

const Client = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

export const genId = (): string => uuid()

export const prisma = Client
