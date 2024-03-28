import { CheckCircle, XCircle } from 'lucide-react'
import { useAudio, useKey, useMedia } from 'react-use'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FooterProps {
  lessonId?: number
  disabled?: boolean
  status: 'correct' | 'wrong' | 'none' | 'completed'
  onCheck: () => void
}

export function Footer({ lessonId, status, disabled, onCheck }: FooterProps) {
  useKey('Enter', onCheck, {}, [onCheck])
  const isMobile = useMedia('(max-width: 1024px)')

  return (
    <footer
      className={cn(
        'lg:-h-[8.75rem] h-[6.25rem] border-t-2',
        status === 'correct' && 'border-transparent bg-green-100',
        status === 'wrong' && 'border-transparent bg-rose-100',
      )}
    >
      <div className="mx-auto flex h-full max-w-[71.25rem] items-center justify-between px-6 lg:px-10">
        {status === 'correct' && (
          <div className="flex items-center text-base font-bold text-green-500 lg:text-2xl">
            <CheckCircle className="mr-4 h-6 w-6 lg:h-10 lg:w-10" />
            Muito bem!
          </div>
        )}
        {status === 'wrong' && (
          <div className="flex items-center text-base font-bold text-rose-500 lg:text-2xl">
            <XCircle className="mr-4 h-6 w-6 lg:h-10 lg:w-10" />
            Tente novamente!
          </div>
        )}
        {status === 'completed' && (
          <Button
            variant="default"
            size={isMobile ? 'sm' : 'lg'}
            onClick={() => (window.location.href = `/lesson/${lessonId}`)}
            className=""
          >
            Repetir
          </Button>
        )}
        <Button
          className="ml-auto"
          onClick={onCheck}
          size={isMobile ? 'sm' : 'lg'}
          variant={status === 'wrong' ? 'danger' : 'secondary'}
          disabled={disabled}
        >
          {status === 'none' && 'Verificar'}
          {status === 'correct' && 'Próxima'}
          {status === 'wrong' && 'Tente novamente'}
          {status === 'completed' && 'Continuar'}
        </Button>
      </div>
    </footer>
  )
}
