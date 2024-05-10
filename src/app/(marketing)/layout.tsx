import type { PropsWithChildren } from 'react'
import MarketingHeader from '@/app/(marketing)/components/Header'
import MarketingFooter from '@/app/(marketing)/components/Footer'

export default function MarketingLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex flex-1 flex-col items-center justify-center">{children}</main>
      <MarketingFooter />
    </div>
  )
}
