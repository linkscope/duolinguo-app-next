import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import SidebarItem from '@/components/sidebar-item'
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs'
import { Loader } from 'lucide-react'

interface Props {
  className?: string
}

export default function Sidebar({ className }: Props) {
  return (
    <aside className={cn('left-0 top-0 flex h-full flex-col border-r-2 px-4 lg:fixed lg:w-[256px]', className)}>
      <Link href="/learn">
        <div className="pb-7 pl-4 pt-8">
          <Image src="/mascot.svg" height={40} width={180} alt="Mascot" />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-y-2">
        <SidebarItem label="学习" iconSrc="/learn.svg" href="/learn" />
        <SidebarItem label="排行榜" iconSrc="/leaderboard.svg" href="/leaderboard" />
        <SidebarItem label="任务" iconSrc="/quests.svg" href="/quests" />
        <SidebarItem label="商店" iconSrc="/shop.svg" href="/shop" />
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </aside>
  )
}
