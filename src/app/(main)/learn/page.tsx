import StickyWrapper from '@/components/sticky-wrapper'
import FeedWrapper from '@/components/feed-wrapper'
import LearnHeader from '@/app/(main)/learn/components/header'
import UserProgress from '@/components/user-progress'

export default function LearnPage() {
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourses={{ title: '西班牙语', imageSrc: '/ES.svg' }}
          hearts={5}
          points={100}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <LearnHeader title="西班牙语" />
        <div className="space-y-2">
          <div className="h-[700px] w-full bg-blue-500" />
          <div className="h-[700px] w-full bg-blue-500" />
          <div className="h-[700px] w-full bg-blue-500" />
        </div>
      </FeedWrapper>
    </div>
  )
}
