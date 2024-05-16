import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import * as schema from '../db/schema'

const sql = neon(process.env.DRIZZLE_DATABASE_URL!)
const db = drizzle(sql, { schema })

const main = async () => {
  try {
    console.log('播种数据库中...')

    await db.delete(schema.courses)
    await db.delete(schema.userProgress)

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: '中文',
        imageSrc: '/CN.svg',
      },
      {
        id: 2,
        title: '西班牙语',
        imageSrc: '/ES.svg',
      },
      {
        id: 3,
        title: '法语',
        imageSrc: '/FR.svg',
      },
      {
        id: 4,
        title: '意大利语',
        imageSrc: '/IT.svg',
      },
      {
        id: 5,
        title: '日语',
        imageSrc: '/JP.svg',
      },
      {
        id: 6,
        title: '英语',
        imageSrc: '/US.svg',
      },
    ])

    console.log('播种完成')
  } catch (error) {
    console.log(error)
    throw new Error('播种数据库失败')
  }
}

main().then()
