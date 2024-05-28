import { getLesson, getUserProgress } from '@/database'
import { redirect } from 'next/navigation'
import LessonQuiz from '@/app/lesson/components/quiz'

export default async function LessonPage() {
  const [lesson, userProgress] = await Promise.all([getLesson(), getUserProgress()])

  if (!lesson || !userProgress) {
    redirect('/learn')
  }

  const initialPercentage =
    (lesson?.challenges.filter((challenge) => challenge.completed).length / lesson?.challenges.length) * 100

  return (
    <LessonQuiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={null}
    />
  )
}
