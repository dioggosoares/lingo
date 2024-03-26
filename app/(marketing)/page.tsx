import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div
      className="mx-auto flex w-full max-w-[61.75rem] flex-1 flex-col items-center
      justify-center gap-2 p-4 lg:flex-row"
    >
      <figure className="relative mb-8 h-60 w-60 lg:mb-0 lg:h-[26.5rem] lg:w-[26.5rem]">
        <Image src="/hero.svg" fill alt="Hero" />
      </figure>

      <div className="flex flex-col items-center gap-y-8 lg:gap-x-8">
        <h1
          className="max-w-[30rem] text-center text-xl font-bold text-neutral-600
          lg:text-3xl"
        >
          Learn, practice and master new languages with{' '}
          <span className="text-green-500">Lingo</span>.
        </h1>
        <div className="flex max-w-[20.625rem] flex-col items-center gap-y-3">
          <ClerkLoading>
            <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton
                mode="modal"
                afterSignInUrl="/learn"
                afterSignUpUrl="/learn"
              >
                <Button variant="secondary" size="lg" className="w-full">
                  Get Started
                </Button>
              </SignUpButton>

              <SignInButton
                mode="modal"
                afterSignInUrl="/learn"
                afterSignUpUrl="/learn"
              >
                <Button variant="primaryOutline" size="lg" className="w-full">
                  I already have an account
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button size="lg" variant="secondary" className="w-full" asChild>
                <Link href="/learn">Continue Learning</Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  )
}
