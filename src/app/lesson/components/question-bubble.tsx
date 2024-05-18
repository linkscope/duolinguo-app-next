import Image from 'next/image'

interface Props {
  question: string
}

export default function LessonQuestionBubble({ question }: Props) {
  return (
    <div className="mb-6 flex items-center gap-x-4">
      <Image src="/mascot.svg" alt="Mascot" height={60} width={60} className="hidden lg:block" />
      <Image src="/mascot.svg" alt="Mascot" height={40} width={40} className="block lg:hidden" />
      <div className="relative rounded-xl border-2 px-4 py-2 text-sm lg:text-base">
        {question}
        <div className="absolute -left-3 top-1/2 size-0 -translate-y-1/2 rotate-90 border-x-8 border-t-8 border-x-transparent" />
      </div>
    </div>
  )
}
