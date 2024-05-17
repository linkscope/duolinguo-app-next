import { cache } from 'react'
import db from './drizzle'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { challengeProgress, courses, units, userProgress } from './schema'

// 获取课程列表
export const getCourses = cache(async () => db.query.courses.findMany())

// 查找课程
export const getCourseById = cache(async (courseId: number) =>
  db.query.courses.findFirst({
    where: eq(courses.id, courseId),
  }),
)

// 获取单元列表
export const getUnits = cache(async () => {
  const { userId } = auth()
  const userProgress = await getUserProgress()

  if (!userId || !userProgress?.activeCourseId) {
    return []
  }

  const data = await db.query.units.findMany({
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        with: {
          challenges: {
            with: {
              challengeProgresses: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  })

  // 携带用户课程完成状态
  return data.map((unit) => {
    const lessonWithCompletedStatus = unit.lessons.map((lesson) => {
      const allCompletedChallenges = lesson.challenges.every((challenge) => {
        return (
          challenge.challengeProgresses &&
          challenge.challengeProgresses.length > 0 &&
          challenge.challengeProgresses.every((progress) => progress.completed)
        )
      })

      return { ...lesson, completed: allCompletedChallenges }
    })

    return { ...unit, lessons: lessonWithCompletedStatus }
  })
})

// 获取用户进度
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
