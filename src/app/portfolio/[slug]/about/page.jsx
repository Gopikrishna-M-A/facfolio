"use client"
import Link from "next/link"
import { Lato } from "next/font/google"
import { FaLinkedin, FaGithub } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { usePortfolio } from "@/contexts/PortfolioProvider"

const latoBold = Lato({
  weight: "900",
  subsets: ["latin"],
  display: "swap",
})

const latoThin = Lato({
  weight: "100",
  subsets: ["latin"],
  display: "swap",
})

const latoRegular = Lato({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

export default function Component() {
  const portfolio = usePortfolio()

  return (
    <>
      <main className='flex-grow flex flex-col items-center justify-start md:mt-10'>
        <div className='w-full flex px-4'>
          <div className='w-full mb-8'>
            <h1 className={`mb-3 text-5xl md:text-7xl ${latoBold.className}`}>
              {portfolio?.data?.user?.name}
            </h1>
            <h2
              className={`sm:mb-2 text-2xl md:text-4xl ${latoRegular.className}`}>
              {portfolio?.data?.about?.userTag}
            </h2>
            <p className={`text-lg ${latoRegular.className}`}>
              @{portfolio?.data?.user?.slug}
            </p>
            <p
              className={`mt-2 sm:text-lg md:text-xl italic ${latoThin.className}`}>
              "{portfolio?.data?.about?.quote}"
            </p>
          </div>
          <div className='flex flex-col gap-5'>
            <Link
              href={portfolio?.data?.about?.linkedinurl || "#"}
              className='text-blue-600 hover:text-blue-800'>
              <FaLinkedin size={24} />
            </Link>
            <Link
              href={portfolio?.data?.about?.twitterurl || "#"}
              className='text-gray-800 hover:text-gray-600'>
              <FaXTwitter size={24} />
            </Link>
            <Link
              href={portfolio?.data?.about?.githuburl || "#"}
              className='text-gray-800 hover:text-gray-600'>
              <FaGithub size={24} />
            </Link>
          </div>
        </div>
        <div
          className={`w-full px-4 grid sm:grid-cols-2 md:grid-cols-3 divide-x divide-y ${latoRegular.className}`}>
          <section className='mb-6 p-4'>
            <h3 className='text-2xl font-semibold mb-2'>Contact Information</h3>
            <p>Email: {portfolio?.data?.user?.email}</p>
            <p>Phone: {portfolio?.data?.user?.phone}</p>
          </section>
          <section className='mb-6 p-4'>
            <h3 className='text-2xl font-semibold mb-2'>Interests</h3>
            <ul className='list-none'>
              {portfolio?.data?.about?.interest?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
          <section className='mb-6 p-4'>
            <h3 className='text-2xl font-semibold mb-2'>Responsibilities</h3>
            <ul className='list-none'>
              {portfolio?.data?.about?.responsibilities?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
          <section className='mb-6 p-4'>
            <h3 className='text-2xl font-semibold mb-2'>Education</h3>
            {portfolio?.data?.about?.education?.map((edu, index) => (
              <div key={index} className='mb-2'>
                <p className='font-semibold'>{edu.degree}</p>
                <p>
                  {edu.school}, {edu.year}
                </p>
              </div>
            ))}
          </section>
          <section className='mb-6 p-4'>
            <h3 className='text-2xl font-semibold mb-2'>Expertise</h3>
            <div className='flex flex-wrap gap-2'>
              {portfolio?.data?.about?.expertise?.map((skill, index) => (
                <span
                  key={index}
                  className='bg-gray-100 rounded-full px-3 py-1 text-sm'>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </main>
      <p className={`mt-5 md:mt-auto text-center ${latoThin.className}`}>
        Discover the story behind my passion
      </p>
    </>
  )
}
