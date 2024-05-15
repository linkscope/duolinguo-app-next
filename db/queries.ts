import { cache } from 'react'
import db from './drizzle'

export const getCourses = cache(async () => await db.query.courses.findMany())
