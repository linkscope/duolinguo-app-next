import { cn } from '@/lib/utils'
import Image from 'next/image'

interface Props {
  value: number
  variant: 'points' | 'hearts'
}

export default function LessonResultCard({ value, variant }: Props) {
  const imageSrc = variant === 'hearts' ? '/heart.svg' : '/points.svg'

  return (
    <div
      className={cn(
        'rounded-2xl border-2 w-full',
        variant === 'points' && 'bg-orange-400 border-orange-400',
        variant === 'hearts' && 'bg-rose-500 border-rose-500',
      )}
    >
      <div
        className={cn(
          'p-1.5 text-white rounded-t-xl font-bold text-center text-xs',
          variant === 'points' && 'bg-orange-400',
          variant === 'hearts' && 'bg-rose-500',
        )}
      >
        {variant === 'hearts' ? '剩余红心' : '总点数'}
      </div>
      <div
        className={cn(
          'rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg',
          variant === 'points' && 'text-orange-400',
          variant === 'hearts' && 'text-rose-500',
        )}
      >
        <Image src={imageSrc} alt="Icon" height={30} width={30} className="mr-1.5" />
        {value}
      </div>
    </div>
  )
}
