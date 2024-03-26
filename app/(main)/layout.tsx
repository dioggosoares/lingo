import { ReactNode } from 'react'

import { MobileHeader } from '@/components/mobile-header'
import { Sidebar } from '@/components/sidebar'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="h-full pt-[3.125rem] lg:pl-64 lg:pt-0">
        <div className="h-full bg-blue-500">{children}</div>
      </main>
    </>
  )
}
