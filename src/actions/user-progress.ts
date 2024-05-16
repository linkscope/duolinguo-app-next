'use server'

import { auth, currentUser } from '@clerk/nextjs/server'
import { getCourseById, getUserProgress, db, userProgress } from '@/database'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { eq } from 'drizzle-orm'

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
        userImageSrc: user.imageUrl || '/mascot.svg',
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
    userImageSrc: user.imageUrl || '/mascot.svg',
  })

  revalidatePath('/courses')
  revalidatePath('/learn')
  redirect('/learn')
}
