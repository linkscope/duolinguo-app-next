'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useExitModal } from '@/store/use-exit-modal'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function ExitModal() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const { isOpen, close } = useExitModal()

  useEffect(() => setIsClient(true), [])

  if (!isClient) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-5 flex w-full items-center justify-center">
            <Image src="/mascot_sad.svg" alt="Mascot" height={80} width={80} />
          </div>
          <DialogTitle className="text-center text-2xl font-bold">请等等，别离开！</DialogTitle>
          <DialogDescription className="text-center text-base">你确定要离开学习课程吗？</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex w-full flex-col gap-y-4">
            <Button variant="primary" className="w-full" size="lg" onClick={close}>
              继续学习
            </Button>
            <Button
              variant="dangerOutline"
              className="w-full"
              size="lg"
              onClick={() => {
                close()
                router.push('/learn')
              }}
            >
              结束学习
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
