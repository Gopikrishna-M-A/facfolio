"use client"
import React, { useState } from "react"
import { Lato } from "next/font/google"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"

const latoThin = Lato({
  weight: "300",
  subsets: ["latin"],
  display: "swap",
})

const NavLink = ({ href, children }) => (
  <Link
    href={href}
    className={`text-gray-600 hover:text-gray-900 ${latoThin.className}`}>
    {children}
  </Link>
)

const NavLinks = ({ slug, className = "" }) => (
  <ul className={`space-y-4 md:space-y-0 md:space-x-4 ${className}`}>
    <li>
      <NavLink href={`/portfolio/${slug}`}>Home</NavLink>
    </li>
    <li>
      <NavLink href={`/portfolio/${slug}/about`}>About</NavLink>
    </li>
    <li>
      <NavLink href={`/portfolio/${slug}/project`}>Projects</NavLink>
    </li>
    <li>
      <NavLink href={`/portfolio/${slug}/research`}>Research</NavLink>
    </li>
    <li>
      <NavLink href={`/portfolio/${slug}/blog`}>Blog</NavLink>
    </li>
    <li>
      <NavLink href={`/portfolio/${slug}/contact`}>Contact</NavLink>
    </li>
  </ul>
)

const PublicNavbar = ({ slug }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className='p-4'>
      <div className='md:hidden'>
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <button className='p-2'>
              <Menu size={24} />
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <div className='p-4'>
              <NavLinks slug={slug} className='flex flex-col' />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      <div className='hidden md:block'>
        <NavLinks slug={slug} className='flex justify-end' />
      </div>
    </nav>
  )
}

export default PublicNavbar
