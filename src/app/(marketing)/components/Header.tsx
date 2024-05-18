import Image from 'next/image'
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function MarketingHeader() {
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-4">
      <div className="mx-auto flex h-full items-center justify-between lg:max-w-screen-lg">
        <div className="pb-7 pl-4 pt-8">
          <Image src="/logo.svg" height={40} width={180} alt="Mascot" />
        </div>
        <ClerkLoading>
          <Loader className="size-5 text-muted-foreground" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal" forceRedirectUrl="/learn" signUpForceRedirectUrl="/learn">
              <Button size="lg" variant="ghost">
                登录
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  )
}
