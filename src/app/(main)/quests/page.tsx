import { getUserProgress } from '@/database'
import { redirect } from 'next/navigation'
import StickyWrapper from '@/components/sticky-wrapper'
import UserProgress from '@/components/user-progress'
import FeedWrapper from '@/components/feed-wrapper'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'

const quests = [
  {
    title: '赚取20XP',
    value: 20,
  },
  {
    title: '赚取50XP',
    value: 50,
  },
  {
    title: '赚取100XP',
    value: 100,
  },
  {
    title: '赚取500XP',
    value: 500,
  },
  {
    title: '赚取1000XP',
    value: 1000,
  },
]

export default async function QuestsPage() {
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
          <Image src="/quests.svg" alt="Quests" height={90} width={90} />
          <h1 className="my-6 text-center text-2xl font-bold text-neutral-800">任务</h1>
          <p className="mb-6 text-center text-lg text-muted-foreground">完成任务赚取积分</p>
          <ul className="w-full">
            {quests.map((quest) => {
              const progress = (userProgress.points / quest.value) * 100

              return (
                <div className="flex w-full items-center gap-x-4 border-t-2 p-4" key={quest.title}>
                  <Image src="/points.svg" alt="Points" width={60} height={60} />
                  <div className="flex w-full flex-col gap-y-2">
                    <p className="text-xl font-bold text-neutral-700">{quest.title}</p>
                    <Progress value={progress} className="h-3" />
                  </div>
                </div>
              )
            })}
          </ul>
        </div>
      </FeedWrapper>
    </div>
  )
}
