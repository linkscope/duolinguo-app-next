import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function MarketingFooter() {
  return (
    <footer className="hidden h-20 w-full border-t-2 border-slate-200 p-2 lg:block">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-evenly">
        <Button size="lg" variant="ghost" className="w-full">
          <Image src="/ES.svg" alt="ES" width={40} height={32} className="mr-4 rounded-md" />
          西班牙语
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image src="/FR.svg" alt="FR" width={40} height={32} className="mr-4 rounded-md" />
          法语
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image src="/IT.svg" alt="IT" width={40} height={32} className="mr-4 rounded-md" />
          意大利语
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image src="/JP.svg" alt="JP" width={40} height={32} className="mr-4 rounded-md" />
          日语
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image src="/US.svg" alt="US" width={40} height={32} className="mr-4 rounded-md" />
          英语
        </Button>
      </div>
    </footer>
  )
}
