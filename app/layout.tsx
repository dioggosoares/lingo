import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { Toaster } from 'sonner'

import { ExitModal } from '@/components/modals/exit-modal'
import { HeartsModal } from '@/components/modals/hearts-modal'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lingo',
  description: 'Learn any language in a fun and fun way',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/mascot.svg',
        href: '/mascot.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/mascot.svg',
        href: '/mascot.svg',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="antialiased" suppressHydrationWarning>
        <body className={nunito.className}>
          <Toaster richColors />
          <ExitModal />
          <HeartsModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
