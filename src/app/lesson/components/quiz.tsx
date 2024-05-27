'use client'

import type { challengeOptions, challenges } from '@/database'
import LessonHeader from '@/app/lesson/components/header'
import { useState } from 'react'
import LessonQuestionBubble from '@/app/lesson/components/question-bubble'
import LessonChallenge from '@/app/lesson/components/challenge'
import LessonFooter from '@/app/lesson/components/footer'

interface Props {
  initialPercentage: number
  initialHearts: number
  initialLessonId: number
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean
    challengeOptions: (typeof challengeOptions.$inferSelect)[]
  })[]
  userSubscription: any // TODO: 替换为订阅数据库类型
}

export default function LessonQuiz({
  initialPercentage,
  initialHearts,
  initialLessonId,
  initialLessonChallenges,
  userSubscription,
}: Props) {
  const [hearts, setHearts] = useState(initialHearts)
  const [percentage, setPercentage] = useState(initialPercentage)
  const [challenges] = useState(initialLessonChallenges)
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed)
    return uncompletedIndex === -1 ? 0 : uncompletedIndex
  })
  const [selectedOption, setSelectedOption] = useState<number>()
  const [status, setStatus] = useState<'correct' | 'wrong' | 'none'>('none')

  const challenge = challenges[activeIndex]
  const title = challenge.type === 'ASSIST' ? '选择正确的含义' : challenge.question
  const options = challenge?.challengeOptions ?? []

  const onSelect = (id: number) => {
    if (status !== 'none') return

    setSelectedOption(id)
  }

  return (
    <>
      <LessonHeader hearts={hearts} percentage={percentage} hasActiveSubscription={!!userSubscription?.isActive} />
      <div className="flex-1">
        <div className="flex h-full items-center justify-center">
          <div className="flex w-full flex-col gap-y-12 px-6 lg:min-h-[350px] lg:w-[600px] lg:px-0">
            <h1 className="text-center text-lg font-bold text-neutral-700 lg:text-start lg:text-3xl">{title}</h1>
            <div>
              {challenge.type === 'ASSIST' && <LessonQuestionBubble question={challenge.question} />}
              <LessonChallenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={false}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <LessonFooter disabled={!selectedOption} status={status} onCheck={() => {}} />
    </>
  )
}
