import StickyWrapper from '@/components/sticky-wrapper'
import FeedWrapper from '@/components/feed-wrapper'
import LearnHeader from '@/app/(main)/learn/components/header'
import LearnUnit from '@/app/(main)/learn/components/unit'
import UserProgress from '@/components/user-progress'
import type { lessons, units as unitsSchema } from '@/database'
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress } from '@/database'
import { redirect } from 'next/navigation'

export default async function LearnPage() {
  const [userProgress, units, courseProgress, lessonPercentage] = await Promise.all([
    getUserProgress(),
    getUnits(),
    getCourseProgress(),
    getLessonPercentage(),
  ])

  if (!userProgress || !userProgress.activeCourse) {
    redirect('/courses')
  }

  if (!courseProgress) {
    redirect('/courses')
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourses={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
      </StickyWrapper>
      <FeedWrapper>
        <LearnHeader title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <LearnUnit
              unit={unit}
              activeLesson={
                courseProgress as
                  | (typeof lessons.$inferSelect & {
                      unit: typeof unitsSchema.$inferSelect
                    })
                  | undefined
              }
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  )
}
