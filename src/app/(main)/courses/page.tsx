import { getCourses } from '@/database'
import CoursesList from '@/app/(main)/courses/components/list'

export default async function CoursesPage() {
  const data = await getCourses()

  return (
    <div className="mx-auto h-full max-w-[912px] px-3">
      <h1 className="text-2xl font-bold text-neutral-700">语言课程</h1>
      <CoursesList courses={data} activeCourseId={1} />
    </div>
  )
}
