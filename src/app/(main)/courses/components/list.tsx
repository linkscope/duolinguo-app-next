'use client'

import type { courses } from '@/database'
import CoursesCard from '@/app/(main)/courses/components/card'

interface Props {
  courses: (typeof courses.$inferSelect)[]
  activeCourseId?: number
}

export default function CoursesList({ courses, activeCourseId }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 pt-6 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
      {courses.map((course) => (
        <CoursesCard
          key={course.id}
          course={course}
          onClick={() => {}}
          disabled={false}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  )
}
