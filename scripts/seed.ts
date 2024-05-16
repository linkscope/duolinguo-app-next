import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import * as schema from '../db/schema'
import { courses, units, lessons, challenges, challengesOptions } from './static'

const sql = neon(process.env.DRIZZLE_DATABASE_URL!)
const db = drizzle(sql, { schema })

const main = async () => {
  try {
    console.log('播种数据库中...')

    await db.delete(schema.courses)
    await db.delete(schema.userProgress)
    await db.delete(schema.units)
    await db.delete(schema.challenges)
    await db.delete(schema.challengeOptions)
    await db.delete(schema.challengeProgress)

    await db.insert(schema.courses).values(courses)
    await db.insert(schema.units).values(units)
    await db.insert(schema.lessons).values(lessons)
    await db.insert(schema.challenges).values(challenges)
    await db.insert(schema.challengeOptions).values(challengesOptions)

    console.log('播种完成')
  } catch (error) {
    console.log(error)
    throw new Error('播种数据库失败')
  }
}

main().then()
