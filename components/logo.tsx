import Image from 'next/image'

export function Logo() {
  return (
    <div className="flex items-center gap-x-3 pb-7 pl-4 pt-8">
      <Image src="/mascot.svg" alt="Mascot" width={40} height={40} />
      <span className="text-2xl font-extrabold tracking-wide text-green-600">
        Lingo
      </span>
    </div>
  )
}
