'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
import { refillHearts } from '@/actions/user-progress'
import { toast } from 'sonner'

interface Props {
  hearts: number
  points: number
}

export default function ShopItem({ hearts, points }: Props) {
  const [pending, startTransition] = useTransition()

  const onRefillHearts = () => {
    if (pending || hearts === 5 || points < 10) {
      return
    }

    startTransition(() => {
      refillHearts().catch(() => toast.error('服务器出错，请重试'))
    })
  }

  return (
    <ul className="w-full">
      <div className="flex w-full items-center gap-x-4 border-t-2 p-4">
        <Image src="/heart.svg" alt="heart" height={60} width={60} />
        <div className="flex-1">
          <p className="text-base font-bold text-neutral-700 lg:text-xl">恢复所有红心</p>
        </div>
        <Button disabled={hearts === 5 || points < 10} onClick={onRefillHearts}>
          {hearts === 5 ? (
            '已满'
          ) : (
            <div className="flex items-center">
              <Image src="/points.svg" alt="Points" height={20} width={20} />
              <p>10</p>
            </div>
          )}
        </Button>
      </div>
    </ul>
  )
}
