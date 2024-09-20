"use client"
import React, { useState } from "react"
import { Lato } from "next/font/google"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
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

export default function ContactPage() {
  const portfolio = usePortfolio()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <>
      <main className='flex-grow flex flex-col items-center justify-start px-4 md:mt-10'>
        <h1 className={`mb-10 text-5xl md:text-7xl ${latoBold.className}`}>
          Contact Me
        </h1>

        <div className='w-full flex flex-col md:flex-row gap-10'>
          {/* Contact Form */}
          <div className='flex-1'>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label
                  htmlFor='name'
                  className={`block mb-2 ${latoRegular.className}`}>
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              <div>
                <label
                  htmlFor='email'
                  className={`block mb-2 ${latoRegular.className}`}>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              <div>
                <label
                  htmlFor='message'
                  className={`block mb-2 ${latoRegular.className}`}>
                  Message
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows='4'
                  className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'></textarea>
              </div>
              <Button type='submit'>
                Send Message
                <Send size={18} className='ml-2' />
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className='flex-1 space-y-6'>
            <h2 className={`text-2xl font-bold mb-4 ${latoRegular.className}`}>
              Get in Touch
            </h2>

            {portfolio?.data?.user?.email && (
              <div className='flex items-center space-x-3'>
                <Mail size={24} />
                <span className={latoThin.className}>
                  {portfolio?.data?.user?.email}
                </span>
              </div>
            )}
            {portfolio?.data?.user?.phone && (
              <div className='flex items-center space-x-3'>
                <Phone size={24} />
                <span className={latoThin.className}>
                  {portfolio?.data?.user?.phone}
                </span>
              </div>
            )}
            {portfolio?.data?.user?.address && (
              <div className='flex items-center space-x-3'>
                <MapPin size={24} />
                <span className={latoThin.className}>
                  {portfolio?.data?.user?.address}
                </span>
              </div>
            )}
          </div>
        </div>
      </main>
      <p className={`mt-5 md:mt-auto text-center ${latoThin.className}`}>
        I look forward to hearing from you!
      </p>
    </>
  )
}
