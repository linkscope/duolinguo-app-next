'use client'

import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
  label: string
  iconSrc: string
  href: string
}

export default function SidebarItem({ label, iconSrc, href }: Props) {
  const pathname = usePathname()

  return (
    <Button variant={pathname === href ? 'sidebarOutline' : 'sidebar'} className="h-[52px] justify-start" asChild>
      <Link href={href}>
        <Image src={iconSrc} alt={label} className="mr-5" height={32} width={32} />
        {label}
      </Link>
    </Button>
  )
}
