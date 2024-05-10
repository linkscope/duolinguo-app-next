import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function MarketingFooter() {
  return (
    <footer className="hidden h-20 w-full border-t-2 border-slate-200 p-2 lg:block">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-evenly">
        <Button size="lg" variant="ghost" className="w-full">
          <Image src="/CN.svg" alt="CN" width={40} height={32} className="mr-4 rounded-md" />
          中文
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image src="/US.svg" alt="US" width={40} height={32} className="mr-4 rounded-md" />
          英语
        </Button>
      </div>
    </footer>
  )
}
