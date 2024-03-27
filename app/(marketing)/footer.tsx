import Image from 'next/image'

import { Button } from '@/components/ui/button'

export function Footer() {
  return (
    <footer className="hidden h-20 w-full border-t-2 border-slate-200 p-2 lg:block">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-evenly">
        <Button variant="ghost" size="lg" className="w-full">
          <Image
            src="/es.svg"
            alt="Spanish"
            width={40}
            height={32}
            className="mr-4 rounded-md"
          />
          Spanish
        </Button>
        <Button variant="ghost" size="lg" className="w-full">
          <Image
            src="/fr.svg"
            alt="French"
            width={40}
            height={32}
            className="mr-4 rounded-md"
          />
          French
        </Button>
        <Button variant="ghost" size="lg" className="w-full">
          <Image
            src="/it.svg"
            alt="Italian"
            width={40}
            height={32}
            className="mr-4 rounded-md"
          />
          Italian
        </Button>
        <Button variant="ghost" size="lg" className="w-full">
          <Image
            src="/us.svg"
            alt="English"
            width={40}
            height={32}
            className="mr-4 rounded-md"
          />
          English
        </Button>
      </div>
    </footer>
  )
}
