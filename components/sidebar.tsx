import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs'
import { Loader } from 'lucide-react'
import Link from 'next/link'

import { Logo } from '@/components/logo'
import { SidebarItem } from '@/components/sidebar-item'
import { cn } from '@/lib/utils'

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div
      className={cn(
        'left-0 top-0 flex h-full flex-col border-r-2 px-4 lg:fixed lg:w-64',
        className,
      )}
    >
      <Link href="/learn">
        <Logo />
      </Link>

      <div className="flex flex-1 flex-col gap-y-2">
        <SidebarItem label="Aprender" href="/learn" iconSrc="/learn.svg" />
        <SidebarItem
          label="Líderança"
          href="/leaderboard"
          iconSrc="/leaderboard.svg"
        />
        <SidebarItem label="Missões" href="/quests" iconSrc="/quests.svg" />
        <SidebarItem label="Comprar" href="/shop" iconSrc="/shop.svg" />
      </div>

      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground" />
        </ClerkLoading>

        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  )
}
