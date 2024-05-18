import type { PropsWithChildren } from 'react'

export default function LessonLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex size-full flex-col">{children}</div>
    </div>
  )
}
