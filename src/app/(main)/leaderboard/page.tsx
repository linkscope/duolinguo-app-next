import { getTopTenUsers, getUserProgress } from '@/database'
import { redirect } from 'next/navigation'
import StickyWrapper from '@/components/sticky-wrapper'
import UserProgress from '@/components/user-progress'
import FeedWrapper from '@/components/feed-wrapper'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import Quests from '@/components/quests'

export default async function LeaderboardPage() {
  const [userProgress, leaderboard] = await Promise.all([getUserProgress(), getTopTenUsers()])

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
        <Quests points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <div className="flex w-full flex-col items-center">
          <Image src="/leaderboard.svg" alt="Leaderboard" height={90} width={90} />
          <h1 className="my-6 text-center text-2xl font-bold text-neutral-800">排行榜</h1>
          <p className="mb-6 text-center text-lg text-muted-foreground">查看你在其余学习者中的学习进度排行</p>
        </div>
        <Separator className="mb-4 h-0.5 rounded-full" />
        {leaderboard.map((userProgress, index) => (
          <div key={userProgress.userId} className="flex w-full items-center rounded-xl p-2 px-4 hover:bg-gray-200/50">
            <p className="mr-4 font-bold text-lime-700">{index + 1}</p>
            <Avatar className="ml-3 mr-6 size-12 border bg-green-500">
              <AvatarImage className="object-cover" src={userProgress.userImageSrc} />
            </Avatar>
            <p className="flex-1 font-bold text-neutral-800">{userProgress.userName}</p>
            <p className="text-muted-foreground">{userProgress.points} XP</p>
          </div>
        ))}
      </FeedWrapper>
    </div>
  )
}
