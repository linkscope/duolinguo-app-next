'use client'

import { InfinityIcon, X } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import { useExitModal } from '@/store/use-exit-modal'

interface Props {
  hearts: number
  percentage: number
  hasActiveSubscription: boolean
}

export default function LessonHeader({ hearts, percentage, hasActiveSubscription }: Props) {
  const { open } = useExitModal()

  return (
    <header className="mx-auto flex w-full max-w-[1140px] items-center justify-between gap-x-7 px-10 pt-[20px] lg:pt-[50px]">
      <X className="cursor-pointer text-slate-500 transition hover:opacity-75" onClick={open} />
      <Progress value={percentage} />
      <div className="flex items-center font-bold text-rose-500">
        <Image src="/heart.svg" alt="heart" width={28} height={28} className="mr-2" />
        {hasActiveSubscription ? <InfinityIcon className="size-6 stroke-[3]" /> : hearts}
      </div>
    </header>
  )
}
