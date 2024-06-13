'use server'

import { auth, currentUser } from '@clerk/nextjs/server'
import { getCourseById, getUserProgress, db, userProgress, challengeProgress, challenges } from '@/database'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { and, eq } from 'drizzle-orm'

export const upsertUserProgress = async (courseId: number) => {
  const { userId } = auth()
  const user = await currentUser()

  if (!userId || !user) {
    throw new Error('未认证')
  }

  const course = await getCourseById(courseId)

  if (!course) {
    throw new Error('未找到相关课程')
  }

  // TODO: 课程长度

  const existingUserProgress = await getUserProgress()

  if (existingUserProgress) {
    await db
      .update(userProgress)
      .set({
        activeCourseId: courseId,
        userName: user.firstName || '默认用户',
        userImageSrc: user.imageUrl || '/logo.svg',
      })
      .where(eq(userProgress.userId, userId))

    revalidatePath('/courses')
    revalidatePath('/learn')
    redirect('/learn')
  }

  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    userName: user.firstName || '默认用户',
    userImageSrc: user.imageUrl || '/logo.svg',
  })

  revalidatePath('/courses')
  revalidatePath('/learn')
  redirect('/learn')
}

export const reduceHearts = async (challengeId: number) => {
  const { userId } = auth()
  if (!userId) {
    throw new Error('未认证')
  }

  const currentUserProgress = await getUserProgress()
  if (!currentUserProgress) {
    throw new Error('用户进度未找到')
  }

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  })
  if (!challenge) {
    throw new Error('未找到挑战')
  }

  const existChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(eq(challengeProgress.userId, userId), eq(challengeProgress.challengeId, challengeId)),
  })
  const isPractice = !!existChallengeProgress
  if (isPractice) {
    return { error: 'practice' }
  }

  if (currentUserProgress.hearts === 0) {
    return { error: 'hearts' }
  }

  await db
    .update(userProgress)
    .set({
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
    })
    .where(eq(userProgress.userId, userId))

  revalidatePath('/shop')
  revalidatePath('/learn')
  revalidatePath('/quests')
  revalidatePath('/leaderboard')
  revalidatePath(`/lesson/${challenge.lessonId}`)
}

export const refillHearts = async () => {
  const currentUserProgress = await getUserProgress()

  if (!currentUserProgress) {
    throw new Error('用户进度未找到')
  }

  if (currentUserProgress.hearts === 5) {
    throw new Error('红心已满')
  }

  if (currentUserProgress.points < 10) {
    throw new Error('没有足够的点数')
  }

  await db
    .update(userProgress)
    .set({
      hearts: 5,
      points: currentUserProgress.points - 10,
    })
    .where(eq(userProgress.userId, currentUserProgress.userId))

  revalidatePath('/shop')
  revalidatePath('/learn')
  revalidatePath('/quests')
  revalidatePath('/leaderboard')
  revalidatePath('/lesson')
}
