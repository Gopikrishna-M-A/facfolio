"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Lato } from "next/font/google"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { usePortfolio } from "@/contexts/PortfolioProvider"

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

const latoRegular = Lato({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

export default function ResearchPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [research, setResearch] = useState([])
  const portfolio = usePortfolio()

  useEffect(() => {
    setResearch(portfolio?.data?.research)
  }, [portfolio])

  const nextResearch = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 2 >= research?.length ? 0 : prevIndex + 2
    )
  }

  const prevResearch = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 2 < 0 ? Math.max(research?.length - 2, 0) : prevIndex - 2
    )
  }

  const ResearchCard = ({ research }) => (
    <div className='border rounded-lg p-6 shadow-md flex flex-col h-full md:min-h-[400px]'>
      <div className='flex-grow'>
        <h2 className={`text-2xl font-bold mb-2 ${latoRegular.className}`}>
          {research?.title}
        </h2>
        <h3 className={`text-xl mb-2 ${latoThin.className}`}>
          {research?.subtitle}
        </h3>
        <p className={`mb-4 ${latoThin.className}`}>{research.para}</p>
        <ul className='list-none space-y-1 mb-4 font-light'>
          <li>{research?.point1}</li>
          <li>{research?.point2}</li>
          <li>{research?.point3}</li>
        </ul>
      </div>
      <div className='flex items-center justify-end mt-4'>
        {research?.link && (
          <Link
            href={research?.link}
            className='flex items-center text-blue-500 hover:text-blue-700'
            target='_blank'
            rel='noopener noreferrer'>
            View Details
            <ExternalLink size={16} className='ml-1' />
          </Link>
        )}
      </div>
    </div>
  )

  return (
    <>
      <main className='flex-grow flex flex-col items-center justify-start px-4 md:mt-10'>
        <h1 className={`mb-10 text-5xl md:text-7xl ${latoBold.className}`}>
          My Research
        </h1>

        {/* Large screens: Carousel with 2 research entries */}
        <div className='w-full hidden md:flex items-center justify-between'>
          <button
            onClick={prevResearch}
            className='p-2 rounded-full bg-gray-200 hover:bg-gray-300'>
            <ChevronLeft size={24} />
          </button>
          <div className='flex-grow grid gap-8 grid-cols-2 mx-4'>
            {research
              ?.slice(currentIndex, currentIndex + 2)
              ?.map((research, index) => (
                <ResearchCard key={index} research={research} />
              ))}
          </div>
          <button
            onClick={nextResearch}
            className='p-2 rounded-full bg-gray-200 hover:bg-gray-300'>
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Small screens: Vertical list of all research entries */}
        <div className='w-full md:hidden space-y-8'>
          {research?.map((research, index) => (
            <ResearchCard key={index} research={research} />
          ))}
        </div>
      </main>
      <p className={`mt-5 md:mt-auto text-center ${latoThin.className}`}>
        Explore my latest research and discoveries
      </p>
    </>
  )
}
