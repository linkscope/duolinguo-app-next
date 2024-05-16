import { cache } from 'react'
import db from './drizzle'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { courses, userProgress } from './schema'

export const getCourses = cache(async () => db.query.courses.findMany())

export const getUserProgress = cache(async () => {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  return db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  })
})

export const getCourseById = cache(async (courseId: number) =>
  db.query.courses.findFirst({
    where: eq(courses.id, courseId),
  }),
)
