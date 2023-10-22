import * as dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { v4 as uuid4 } from 'uuid'

dotenv.config()

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

export const genId = (): string => uuid4()

export default prisma
