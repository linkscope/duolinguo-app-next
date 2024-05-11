import type { PropsWithChildren } from 'react'
import Sidebar from '@/components/sidebar'
import MobileHeader from '@/components/mobile-header'

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="h-full pt-[50px] lg:pl-[256px] lg:pt-0">
        <div className="mx-auto h-full max-w-[1056px] pt-6">{children}</div>
      </main>
    </>
  )
}
