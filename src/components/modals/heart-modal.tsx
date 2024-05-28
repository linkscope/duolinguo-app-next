'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useHeartsModal } from '@/store/use-hearts-modal'
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

export default function HeartModal() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const { isOpen, close } = useHeartsModal()

  useEffect(() => setIsClient(true), [])

  const onClick = () => {
    close()
    router.push('/store')
  }

  if (!isClient) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-5 flex w-full items-center justify-center">
            <Image src="/mascot_bad.svg" alt="Mascot" height={80} width={80} />
          </div>
          <DialogTitle className="text-center text-2xl font-bold">你没有剩余的红心！</DialogTitle>
          <DialogDescription className="text-center text-base">获取无限红心，或前往商店购买</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex w-full flex-col gap-y-4">
            <Button variant="primary" className="w-full" size="lg" onClick={onClick}>
              获取无限红心
            </Button>
            <Button variant="primaryOutline" className="w-full" size="lg" onClick={close}>
              不了，谢谢
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
