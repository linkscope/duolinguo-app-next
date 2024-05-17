import StickyWrapper from '@/components/sticky-wrapper'
import FeedWrapper from '@/components/feed-wrapper'
import LearnHeader from '@/app/(main)/learn/components/header'
import LearnUnit from '@/app/(main)/learn/components/unit'
import UserProgress from '@/components/user-progress'
import { getUnits, getUserProgress } from '@/database'
import { redirect } from 'next/navigation'

export default async function LearnPage() {
  const [userProgress, units] = await Promise.all([getUserProgress(), getUnits()])

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
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <LearnUnit unit={unit} activeLesson={undefined} activeLessonPercentage={0} />
          </div>
        ))}
      </FeedWrapper>
    </div>
  )
}
