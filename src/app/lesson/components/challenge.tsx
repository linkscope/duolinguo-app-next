import type { challengeOptions, challenges } from '@/database'
import { cn } from '@/lib/utils'
import LessonCard from '@/app/lesson/components/card'

interface Props {
  options: (typeof challengeOptions.$inferSelect)[]
  onSelect: (id: number) => void
  status: 'correct' | 'wrong' | 'none'
  selectedOption?: number
  disabled?: boolean
  type: (typeof challenges.$inferSelect)['type']
}

export default function LessonChallenge({ options, selectedOption, onSelect, disabled, status, type }: Props) {
  return (
    <div
      className={cn(
        'grid gap-2',
        type === 'ASSIST' && 'grid-cols-1',
        type === 'SELECT' && 'grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]',
      )}
    >
      {options.map((option, index) => (
        <LessonCard
          key={option.id}
          option={option}
          shortcut={`${index + 1}`}
          selected={selectedOption === option.id}
          onClick={() => onSelect(option.id)}
          status={status}
          disabled={disabled}
          type={type}
        />
      ))}
    </div>
  )
}
