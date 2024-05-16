import StickyWrapper from '@/components/sticky-wrapper'
import FeedWrapper from '@/components/feed-wrapper'
import LearnHeader from '@/app/(main)/learn/components/header'
import UserProgress from '@/components/user-progress'
import { getUserProgress } from '@/database'
import { redirect } from 'next/navigation'

export default async function LearnPage() {
  const [userProgress] = await Promise.all([getUserProgress()])

  if (!userProgress || !userProgress.activeCourse) {
    redirect('/courses')
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourses={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <LearnHeader title={userProgress.activeCourse.title} />
        <div className="space-y-2">
          <div className="h-[700px] w-full bg-blue-500" />
          <div className="h-[700px] w-full bg-blue-500" />
          <div className="h-[700px] w-full bg-blue-500" />
        </div>
      </FeedWrapper>
    </div>
  )
}
