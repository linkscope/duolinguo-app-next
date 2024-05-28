'use client'

import type { challengeOptions, challenges } from '@/database'
import LessonHeader from '@/app/lesson/components/header'
import { useState, useTransition } from 'react'
import LessonQuestionBubble from '@/app/lesson/components/question-bubble'
import LessonChallenge from '@/app/lesson/components/challenge'
import LessonFooter from '@/app/lesson/components/footer'
import LessonResultCard from '@/app/lesson/components/result-card'
import { upsertChallengeProgress } from '@/actions/challenge-progress'
import { toast } from 'sonner'
import { reduceHearts } from '@/actions/user-progress'
import { useAudio, useWindowSize } from 'react-use'
import Image from 'next/image'
import Confetti from 'react-confetti'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()
  const { width, height } = useWindowSize()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [correctAudio, _c, correctControls] = useAudio({ src: '/correct.wav' })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [incorrectAudio, _i, incorrectControls] = useAudio({ src: '/incorrect.wav' })
  const [finishAudio] = useAudio({ src: '/finish.mp3', autoPlay: true })
  const [pending, startTransition] = useTransition()

  const [hearts, setHearts] = useState(initialHearts)
  const [percentage, setPercentage] = useState(initialPercentage)
  const [lessonId] = useState(initialLessonId)
  const [challenges] = useState(initialLessonChallenges)
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed)
    return uncompletedIndex === -1 ? 0 : uncompletedIndex
  })
  const [selectedOption, setSelectedOption] = useState<number>()
  const [status, setStatus] = useState<'correct' | 'wrong' | 'none'>('none')

  const challenge = challenges[activeIndex]
  if (!challenge) {
    return (
      <>
        {finishAudio}
        <Confetti recycle={false} numberOfPieces={500} tweenDuration={10000} width={width} height={height} />
        <div className="mx-auto flex h-full max-w-lg flex-col items-center justify-center gap-y-4 text-center lg:gap-y-8">
          <Image src="/finish.svg" alt="Finish" className="hidden lg:block" height={100} width={100} />
          <Image src="/finish.svg" alt="Finish" className="block lg:hidden" height={50} width={50} />
          <h1 className="text-xl font-bold text-neutral-700 lg:text-3xl">
            干得漂亮！
            <br /> 你已经完成了本课程。
          </h1>
          <div className="flex w-full items-center gap-x-4">
            <LessonResultCard variant="points" value={challenges.length * 10} />
            <LessonResultCard variant="hearts" value={hearts} />
          </div>
        </div>
        <LessonFooter
          lessonId={lessonId}
          onCheck={() => {
            router.push('/learn')
          }}
          status="completed"
        />
      </>
    )
  }

  const title = challenge.type === 'ASSIST' ? '选择正确的含义' : challenge.question
  const options = challenge?.challengeOptions ?? []

  const onSelect = (id: number) => {
    if (status !== 'none') return

    setSelectedOption(id)
  }

  const onNext = () => {
    setActiveIndex((current) => current + 1)
  }

  const onContinue = () => {
    if (!selectedOption) return

    if (status === 'wrong') {
      setStatus('none')
      setSelectedOption(undefined)
      return
    }

    if (status === 'correct') {
      onNext()
      setStatus('none')
      setSelectedOption(undefined)
      return
    }

    const correctOption = options.find((option) => option.correct)
    if (!correctOption) return

    if (correctOption && correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((response) => {
            if (response?.error === 'hearts') {
              console.error('hearts')
              return
            }

            correctControls.play()
            setStatus('correct')
            setPercentage((prev) => prev + 100 / challenges.length)

            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5))
            }
          })
          .catch(() => toast.error('出现了些问题，请重试'))
      })
    } else {
      startTransition(() => {
        reduceHearts(challenge.id)
          .then((response) => {
            if (response?.error === 'hearts') {
              console.error('hearts')
              return
            }

            incorrectControls.play()
            setStatus('wrong')

            if (!response?.error) {
              setHearts((prev) => Math.max(prev - 1, 0))
            }
          })
          .catch(() => toast.error('出现了些问题，请重试'))
      })
    }
  }

  return (
    <>
      {correctAudio}
      {incorrectAudio}
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
      <LessonFooter disabled={pending || !selectedOption} status={status} onCheck={onContinue} />
    </>
  )
}
