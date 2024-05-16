import { Loader } from 'lucide-react'

export default function CoursesLoading() {
  return (
    <div className="flex size-full items-center justify-center">
      <Loader className="size-6 animate-spin text-muted-foreground" />
    </div>
  )
}
