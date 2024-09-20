"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
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

export default function BlogPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [blogs, setBlogs] = useState([])
  const portfolio = usePortfolio()

  useEffect(() => {
    setBlogs(portfolio?.data?.blog)
  }, [portfolio])

  const nextBlog = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 2 >= blogs?.length ? 0 : prevIndex + 2
    )
  }

  const prevBlog = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 2 < 0 ? Math.max(blogs?.length - 2, 0) : prevIndex - 2
    )
  }

  const BlogCard = ({ blog }) => (
    <div className='border rounded-lg shadow-md flex flex-col md:min-h-[430px]'>
      <div className='relative h-48 w-full'>
        <Image
          src={blog?.imageUrl}
          alt={blog?.title}
          fill
          style={{ objectFit: "cover" }}
          className='rounded-t-lg'
        />
      </div>
      <div className='p-6 flex-grow flex flex-col'>
        <h2 className={`text-2xl font-bold mb-2 ${latoRegular.className}`}>
          {blog?.title}
        </h2>
        <p className={`mb-4 flex-grow ${latoThin.className}`}>{blog?.para}</p>
        <div className='flex items-center justify-end mt-4'>
          {blog?.link && (
            <Link
              href={blog?.link}
              className='flex items-center text-blue-500 hover:text-blue-700'
              target='_blank'
              rel='noopener noreferrer'>
              Read More
              <ExternalLink size={16} className='ml-1' />
            </Link>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <>
      <main className='flex-grow flex flex-col items-center justify-start px-4 md:mt-10'>
        <h1 className={`mb-10 text-5xl md:text-7xl ${latoBold.className}`}>
          My Blog
        </h1>

        {/* Large screens: Carousel with 2 blog entries */}
        <div className='w-full hidden md:flex items-center justify-between'>
          <button
            onClick={prevBlog}
            className='p-2 rounded-full bg-gray-200 hover:bg-gray-300'>
            <ChevronLeft size={24} />
          </button>
          <div className='flex-grow grid gap-8 grid-cols-2 mx-4'>
            {blogs
              ?.slice(currentIndex, currentIndex + 2)
              ?.map((blog, index) => (
                <BlogCard key={index} blog={blog} />
              ))}
          </div>
          <button
            onClick={nextBlog}
            className='p-2 rounded-full bg-gray-200 hover:bg-gray-300'>
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Small screens: Vertical list of all blog entries */}
        <div className='w-full md:hidden space-y-8'>
          {blogs?.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </div>
      </main>
      <p className={`mt-5 md:mt-auto text-center ${latoThin.className}`}>
        Explore my latest thoughts and insights
      </p>
    </>
  )
}
