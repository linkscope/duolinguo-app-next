import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import * as schema from '../db/schema'
import { courses } from './static'

const sql = neon(process.env.DRIZZLE_DATABASE_URL!)
const db = drizzle(sql, { schema })

const main = async () => {
  try {
    console.log('播种数据库中...')

    await db.delete(schema.courses)
    await db.delete(schema.userProgress)

    await db.insert(schema.courses).values(courses)

    console.log('播种完成')
  } catch (error) {
    console.log(error)
    throw new Error('播种数据库失败')
  }
}

main().then()
