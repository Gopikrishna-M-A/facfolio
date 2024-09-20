"use client"
import Image from "next/image"
import { Whisper } from "next/font/google"
import { Lato } from "next/font/google"
import { usePortfolio } from "@/contexts/PortfolioProvider"

const whisper = Whisper({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

const latoBold = Lato({
  weight: "900",
  style: "italic",
  subsets: ["latin"],
  display: "swap",
})
const latoThin = Lato({
  weight: "100",
  style: "italic",
  subsets: ["latin"],
  display: "swap",
})

export default function Component() {
  const portfolio = usePortfolio()
  console.log(portfolio)

  return (
    <main className='flex-grow flex flex-col items-center justify-center'>
      <div className='mb-10 relative w-48 h-48 overflow-hidden rounded-full'>
        <Image
          src={
            portfolio?.data?.user?.customImageUrl ||
            portfolio?.data?.user?.image
          }
          alt='John Doe'
          layout='fill'
          objectFit='cover'
          className='rounded-full'
        />
      </div>
      <div className='text-center'>
        <h3 className={`mb-3 text-5xl md:text-7xl ${latoBold.className}`}>
          {portfolio?.data?.user?.name}
        </h3>
        <h3 className={`mb-3 text-2xl md:text-4xl ${whisper.className}`}>
          {portfolio?.data?.home?.ctaheading}
        </h3>
        <div className='inline-block'></div>
      </div>
      <p
        className={`mt-auto absolute bottom-10 font-thin text-gray-900 ${latoThin.className}`}>
        {portfolio?.data?.home?.ctapara}
      </p>
    </main>
  )
}
