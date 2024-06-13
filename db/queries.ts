import { cache } from 'react'
import db from './drizzle'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { challengeProgress, courses, lessons, units, userProgress } from './schema'

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
      if (lesson.challenges.length === 0) {
        return { ...lesson, completed: false }
      }

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

// 获取用户第一个还没完成的课程
export const getCourseProgress = cache(async () => {
  const { userId } = auth()
  const userProgress = await getUserProgress()

  if (!userId || !userProgress?.activeCourseId) {
    return null
  }

  const unitsInActiveCourse = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          unit: true,
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

  return unitsInActiveCourse
    .flatMap((unit) => unit.lessons)
    .find((lesson) => {
      return lesson.challenges.some(
        (challenge) =>
          !challenge.challengeProgresses ||
          challenge.challengeProgresses.length === 0 ||
          challenge.challengeProgresses.some((progress) => progress.completed === false),
      )
    })
})

// 获取课程列表
export const getLesson = cache(async (id?: number) => {
  const { userId } = auth()
  if (!userId) {
    return null
  }

  const courseProgress = await getCourseProgress()
  const lessonId = id || courseProgress?.id
  if (!lessonId) {
    return null
  }

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
    with: {
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOptions: true,
          challengeProgresses: {
            where: eq(challengeProgress.userId, userId),
          },
        },
      },
    },
  })

  if (!data || !data.challenges) {
    return null
  }

  const normalizedChallenges = data.challenges.map((challenge) => {
    const completed =
      challenge.challengeProgresses &&
      challenge.challengeProgresses.length > 0 &&
      challenge.challengeProgresses.every((progress) => progress.completed)

    return { ...challenge, completed }
  })

  return { ...data, challenges: normalizedChallenges }
})

// 获取用户当前课程进度
export const getLessonPercentage = cache(async () => {
  const courseProgress = await getCourseProgress()
  if (!courseProgress?.id) {
    return 0
  }

  const lesson = await getLesson(courseProgress.id)
  if (!lesson) {
    return 0
  }

  const completedChallenges = lesson.challenges.filter((challenge) => challenge.completed)
  return Math.round((completedChallenges.length / lesson.challenges.length) * 100)
})

// 获取排行榜
export const getTopTenUsers = cache(async () => {
  const { userId } = auth()

  if (!userId) {
    return []
  }

  return db.query.userProgress.findMany({
    orderBy: (userProgress, { desc }) => [desc(userProgress.points)],
    limit: 10,
    columns: {
      userId: true,
      userName: true,
      userImageSrc: true,
      points: true,
    },
  })
})
