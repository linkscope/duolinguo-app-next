import StickyWrapper from '@/components/sticky-wrapper'
import UserProgress from '@/components/user-progress'
import { getUserProgress } from '@/database'
import { redirect } from 'next/navigation'
import FeedWrapper from '@/components/feed-wrapper'
import Image from 'next/image'
import ShopItem from '@/app/(main)/shop/components/item'

export default async function ShopPage() {
  const [userProgress] = await Promise.all([getUserProgress()])

  if (!userProgress || !userProgress.activeCourse) {
    redirect('/courses')
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourses={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
      </StickyWrapper>
      <FeedWrapper>
        <div className="flex w-full flex-col items-center">
          <Image src="/shop.svg" alt="Shop" height={90} width={90} />
          <h1 className="my-6 text-center text-2xl font-bold text-neutral-800">商店</h1>
          <p className="mb-6 text-center text-lg text-muted-foreground">使用你的积分购买精美商品</p>
          <ShopItem hearts={userProgress.hearts} points={userProgress.points} />
        </div>
      </FeedWrapper>
    </div>
  )
}
