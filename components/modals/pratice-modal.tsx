'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { usePracticeModal } from '@/store/use-practice-modal'

export function PracticeModal() {
  const [isClient, setIsClient] = useState(false)
  const { isOpen, close } = usePracticeModal()

  useEffect(() => setIsClient(true), [])

  if (!isClient) return null

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-5 flex w-full items-center justify-center">
            <Image src="/heart.svg" alt="Hearts" height={100} width={100} />
          </div>
          <DialogTitle className="text-center text-2xl font-bold">
            Pratique a lição.
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Refaça lições para recuperar corações e pontos. Você não pode perder
            corações ou pontos refazendo lições.
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
              Eu entendi.
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
