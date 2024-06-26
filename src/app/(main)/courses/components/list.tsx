'use client'

import type { courses, userProgress } from '@/database'
import CoursesCard from '@/app/(main)/courses/components/card'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { upsertUserProgress } from '@/actions/user-progress'
import { toast } from 'sonner'

interface Props {
  courses: (typeof courses.$inferSelect)[]
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId
}

export default function CoursesList({ courses, activeCourseId }: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const onClick = (id: number) => {
    if (pending) {
      return
    }

    if (id === activeCourseId) {
      return router.push('/learn')
    }

    startTransition(() => {
      upsertUserProgress(id).catch(() => toast.error('服务器错误'))
    })
  }

  return (
    <div className="grid grid-cols-2 gap-4 pt-6 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
      {courses.map((course) => (
        <CoursesCard
          key={course.id}
          course={course}
          onClick={onClick}
          disabled={pending || course.title !== '英语'}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  )
}
