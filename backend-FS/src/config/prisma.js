import 'dotenv/config'
import pkg from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const { PrismaClient } = pkg
const { Pool } = pg
const connectionString = process.env.DATABASE_URL

// Configure SSL based on environment
const sslConfig = process.env.NODE_ENV === 'production' 
  ? { rejectUnauthorized: false }
  : false

const pool = new Pool({
  connectionString,
  ssl: sslConfig
})
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ 
  adapter,
  errorFormat: 'pretty'
})

export default prisma
