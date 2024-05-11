import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { InfinityIcon } from 'lucide-react'

interface Props {
  activeCourses: any // TODO: 替换为DB类型
  hearts: number
  points: number
  hasActiveSubscription: boolean
}

export default function UserProgress({ activeCourses, hearts, points, hasActiveSubscription }: Props) {
  return (
    <div className="flex w-full items-center justify-between gap-x-2">
      <Link href="/courses">
        <Button variant="ghost">
          <Image
            src={activeCourses.imageSrc}
            alt={activeCourses.title}
            className="rounded-md border"
            width={32}
            height={32}
          />
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className="text-orange-500">
          <Image src="/points.svg" alt="Points" height={28} width={28} className="mr-2" />
          {points}
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className="text-rose-500">
          <Image src="/heart.svg" alt="Hearts" height={22} width={22} className="mr-2" />
          {hasActiveSubscription ? <InfinityIcon className="size-4 stroke-[3]" /> : hearts}
        </Button>
      </Link>
    </div>
  )
}