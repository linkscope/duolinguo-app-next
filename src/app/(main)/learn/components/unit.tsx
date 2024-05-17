import type { units, lessons } from '@/database'
import LearnUnitBanner from '@/app/(main)/learn/components/unit-banner'
import LearnLessonButton from '@/app/(main)/learn/components/lesson-button'

interface Props {
  unit: typeof units.$inferSelect & {
    lessons: (typeof lessons.$inferSelect & {
      completed: boolean
    })[]
  }
  activeLesson:
    | (typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect
      })
    | undefined
  activeLessonPercentage: number
}

export default function LearnUnit({ unit, activeLesson, activeLessonPercentage }: Props) {
  return (
    <>
      <LearnUnitBanner title={unit.title} description={unit.description} />
      <div className="relative flex flex-col items-center">
        {unit.lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id
          const isLocked = !lesson.completed && !isCurrent

          return (
            <LearnLessonButton
              key={lesson.id}
              id={lesson.id}
              index={index}
              totalCount={unit.lessons.length - 1}
              percentage={activeLessonPercentage}
              current={isCurrent}
              locked={isLocked}
            />
          )
        })}
      </div>
    </>
  )
}
