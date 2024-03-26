'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from './ui/button'

interface SidebarItemProps {
  label: string
  iconSrc: string
  href: string
}

export function SidebarItem({ href, iconSrc, label }: SidebarItemProps) {
  const pathname = usePathname()
  const active = pathname === href
  return (
    <Button
      variant={active ? 'sidebarOutline' : 'sidebar'}
      className="h-[3.25rem] justify-start"
      asChild
    >
      <Link href={href}>
        <Image
          src={iconSrc}
          alt={label}
          className="mr-5"
          height={32}
          width={32}
        />
        {label}
      </Link>
    </Button>
  )
}
