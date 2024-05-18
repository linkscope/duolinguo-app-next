import type { challengeOptions, challenges } from '@/database'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface Props {
  option: typeof challengeOptions.$inferSelect
  shortcut: string
  selected?: boolean
  onClick: () => void
  disabled?: boolean
  status?: 'correct' | 'wrong' | 'none'
  type: (typeof challenges.$inferSelect)['type']
}

export default function LessonCard({ option, shortcut, selected, onClick, disabled, status, type }: Props) {
  return (
    <div
      className={cn(
        'h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2',
        selected && 'border-sky-300 bg-sky-100 hover:bg-sky-100',
        selected && status === 'correct' && 'border-green-300 bg-green-100 hover:bg-green-100',
        selected && status === 'wrong' && 'border-rose-300 bg-rose-100 hover:bg-rose-100',
        disabled && 'pointer-events-none hover:bg-white',
        type === 'ASSIST' && 'lg:p-3 w-full',
      )}
      onClick={() => {}}
    >
      {option.imageSrc && (
        <div className="relative mb-4 aspect-square max-h-[80px] w-full lg:max-h-[150px]">
          <Image src={option.imageSrc} alt={option.text} fill />
        </div>
      )}
      <div className={cn('flex items-center justify-between', type === 'ASSIST' && 'flex-row-reverse')}>
        {type === 'ASSIST' && <div />}
        <p
          className={cn(
            'text-neutral-600 text-sm lg:text-base',
            selected && 'text-sky-500',
            selected && status === 'correct' && 'text-green-500',
            selected && status === 'wrong' && 'text-rose-500',
          )}
        >
          {option.text}
        </p>
        <div
          className={cn(
            'size-[20px] lg:size-[30px] border-2 flex items-center justify-center rounded-lg text-neutral-400 lg:text-[15px] text-xs font-semibold',
            selected && 'border-sky-300 text-sky-500',
            selected && status === 'correct' && 'border-green-300 text-green-500',
            selected && status === 'wrong' && 'border-rose-300 text-rose-500',
          )}
        >
          {shortcut}
        </div>
      </div>
    </div>
  )
}
