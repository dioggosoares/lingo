'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useExitModal } from '@/store/use-exit-model'

export function ExitModal() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const { isOpen, close } = useExitModal()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  useEffect(() => setIsClient(true), [])

  if (!isClient) return null

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-5 flex w-full items-center justify-center">
            <Image
              src="/mascot_sad.svg"
              alt="Mascot Sad"
              height={80}
              width={80}
            />
          </div>
          <DialogTitle className="text-center text-2xl font-bold">
            Espere, não vá!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Você está prestes a sair da aula. Tem certeza?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex w-full flex-col gap-y-4">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={close}
            >
              Continue aprendendo
            </Button>

            <Button
              variant="dangerOutline"
              size="lg"
              className="w-full"
              onClick={() => {
                close()
                router.push('/learn')
              }}
            >
              Encerrar sessão
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
