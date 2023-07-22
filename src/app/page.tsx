import Swap from '@/components/swap'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <section className="flex flex-col gap-24 justify-center items-center">
        <h1 className="font-semibold text-4xl sm:text-7xl text-center">Swap your face into memes.</h1>
        <Swap />
      </section>
    </main>
  )
}
