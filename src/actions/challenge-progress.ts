'use server'

import { auth } from '@clerk/nextjs/server'
import { challengeProgress, challenges, db, getUserProgress, userProgress } from '@/database'
import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export const upsertChallengeProgress = async (challengeId: number) => {
  const { userId } = auth()

  if (!userId) {
    throw new Error('未认证')
  }

  const currentUserProgress = await getUserProgress()

  if (!currentUserProgress) {
    throw new Error('未找到用户进度')
  }

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  })

  if (!challenge) {
    throw new Error('未找到挑战')
  }

  const lessonId = challenge.lessonId
  const existChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(eq(challengeProgress.userId, userId), eq(challengeProgress.challengeId, challengeId)),
  })

  const isPractice = !!existChallengeProgress

  if (currentUserProgress.hearts === 0 && !isPractice) {
    return {
      error: 'hearts',
    }
  }

  if (isPractice) {
    await db
      .update(challengeProgress)
      .set({
        completed: true,
      })
      .where(eq(challengeProgress.id, existChallengeProgress?.id))

    await db
      .update(userProgress)
      .set({
        hearts: Math.min(currentUserProgress.hearts + 1, 5),
        points: currentUserProgress.points + 10,
      })
      .where(eq(userProgress.userId, userId))

    revalidatePath('/learn')
    revalidatePath('/lesson')
    revalidatePath('/quests')
    revalidatePath('/leaderboard')
    revalidatePath(`/lesson/${lessonId}`)

    return
  }

  await db.insert(challengeProgress).values({
    challengeId,
    userId,
    completed: true,
  })

  await db
    .update(userProgress)
    .set({
      points: currentUserProgress.points + 10,
    })
    .where(eq(userProgress.userId, userId))

  revalidatePath('/learn')
  revalidatePath('/lesson')
  revalidatePath('/quests')
  revalidatePath('/leaderboard')
  revalidatePath(`/lesson/${lessonId}`)
}
