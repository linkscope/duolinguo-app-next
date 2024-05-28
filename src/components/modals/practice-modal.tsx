'use client'

import { useEffect, useState } from 'react'
import { usePracticeModal } from '@/store/use-practice-modal'
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

export default function PracticeModal() {
  const [isClient, setIsClient] = useState(false)
  const { isOpen, close } = usePracticeModal()

  useEffect(() => setIsClient(true), [])

  if (!isClient) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-5 flex w-full items-center justify-center">
            <Image src="/heart.svg" alt="Heart" height={100} width={100} />
          </div>
          <DialogTitle className="text-center text-2xl font-bold">复习课程</DialogTitle>
          <DialogDescription className="text-center text-base">
            在复习课程中你可以再次获取红心和积分，同时你也不会失去红心或积分。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex w-full flex-col gap-y-4">
            <Button variant="primary" className="w-full" size="lg" onClick={close}>
              我已了解
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
