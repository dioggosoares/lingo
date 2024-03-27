import { ReactNode } from 'react'

interface StickyWrapperProps {
  children: ReactNode
}

export function StickyWrapper({ children }: StickyWrapperProps) {
  return (
    <div className="sticky bottom-6 hidden w-[23rem] self-end lg:block">
      <div className="sticky top-6 flex min-h-[calc(100vh-3rem)] flex-col gap-y-4">
        {children}
      </div>
    </div>
  )
}
