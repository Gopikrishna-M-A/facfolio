"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Lato } from "next/font/google"
import {
  ChevronLeft,
  ChevronRight,
  Github,
  ExternalLink,
  Calendar,
  DollarSign,
  Tag,
  Users,
  BookOpen,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
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

function ProjectDialog({ project }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='text-blue-500 hover:text-blue-700 cursor-pointer'>
          View Details
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[625px] h-[90vh]'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>
            {project.title}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className='mt-4'>
          <div className='space-y-6'>
            <p className='text-gray-600'>{project?.description}</p>

            <div className='flex items-center space-x-4 text-sm text-gray-500'>
              <div className='flex items-center'>
                <Calendar className='w-4 h-4 mr-1' />
                <span>
                  {new Date(project?.startDate).toLocaleDateString()} -{" "}
                  {new Date(project?.endDate).toLocaleDateString()}
                </span>
              </div>
              {project.fundingAmount > 0 && (
                <div className='flex items-center'>
                  <DollarSign className='w-4 h-4 mr-1' />
                  <span>${project?.fundingAmount?.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className='flex flex-wrap gap-2'>
              {project?.tags?.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className='flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm'>
                  <Tag className='w-3 h-3 mr-1' />
                  {tag}
                </span>
              ))}
            </div>

            <div>
              <h3 className='text-lg font-semibold mb-2 flex items-center'>
                <DollarSign className='w-5 h-5 mr-2' />
                Funding Sources
              </h3>
              <ul className='list-disc list-inside'>
                {project?.fundingSources?.map((source, index) => (
                  <li key={index}>{source}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className='text-lg font-semibold mb-2 flex items-center'>
                <Users className='w-5 h-5 mr-2' />
                Collaborators
              </h3>
              <p>{project.collaborators?.join(", ")}</p>
            </div>

            {project?.publications?.length > 0 && (
              <div>
                <h3 className='text-lg font-semibold mb-2 flex items-center'>
                  <BookOpen className='w-5 h-5 mr-2' />
                  Publications
                </h3>
                <ul className='space-y-2'>
                  {project?.publications?.map((pub, pubIndex) => (
                    <li key={pubIndex} className='bg-gray-50 p-3 rounded'>
                      <p className='font-semibold'>"{pub.title}"</p>
                      <p className='text-sm text-gray-600'>
                        {pub?.authors?.join(", ")}
                      </p>
                      <p className='text-sm text-gray-500'>
                        {pub.conference}, {pub.year}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className='flex justify-center space-x-4 pt-4'>
              {project?.githubLink && (
                <Link
                  href={project.githubLink}
                  className='flex items-center text-gray-600 hover:text-gray-800'
                  target='_blank'
                  rel='noopener noreferrer'>
                  <Github className='w-5 h-5 mr-1' />
                  GitHub
                </Link>
              )}
              {project?.link && (
                <Link
                  href={project.link}
                  className='flex items-center text-gray-600 hover:text-gray-800'
                  target='_blank'
                  rel='noopener noreferrer'>
                  <ExternalLink className='w-5 h-5 mr-1' />
                  Live Demo
                </Link>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default function ProjectsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [projects, setProjects] = useState([])
  const portfolio = usePortfolio()

  useEffect(() => {
    setProjects(portfolio?.data?.project)
  }, [portfolio])

  const nextProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 2 >= projects?.length ? 0 : prevIndex + 2
    )
  }

  const prevProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 2 < 0 ? Math.max(projects?.length - 2, 0) : prevIndex - 2
    )
  }

  const ProjectCard = ({ project }) => (
    <div className='border rounded-lg p-6 shadow-md flex flex-col h-full md:min-h-72'>
      <div className='flex-grow'>
        <h2 className={`text-2xl font-bold mb-2 ${latoRegular.className}`}>
          {project.title}
        </h2>
        <p className={`mb-4 ${latoThin.className}`}>
          {project.description.substring(0, 100)}...
        </p>
        <div className='mb-4 flex flex-wrap gap-2'>
          {project.tags.slice(0, 3).map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className='bg-gray-200 rounded-full px-3 py-1 text-sm'>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className='flex items-center justify-between mt-4'>
        <ProjectDialog project={project} />
        <div className='flex items-center space-x-4'>
          {project?.githubLink && (
            <Link
              href={project.githubLink}
              className='text-gray-600 hover:text-gray-800'
              target='_blank'
              rel='noopener noreferrer'>
              <Github size={20} />
            </Link>
          )}
          {project?.link && (
            <Link
              href={project.link}
              className='text-gray-600 hover:text-gray-800'
              target='_blank'
              rel='noopener noreferrer'>
              <ExternalLink size={20} />
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
          My Projects
        </h1>

        {/* Large screens: Carousel with 2 projects */}
        <div className='w-full hidden md:flex items-center justify-between'>
          <button
            onClick={prevProject}
            className='p-2 rounded-full bg-gray-200 hover:bg-gray-300'>
            <ChevronLeft size={24} />
          </button>
          <div className='flex-grow grid gap-8 grid-cols-2 mx-4'>
            {projects
              ?.slice(currentIndex, currentIndex + 2)
              ?.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
          </div>
          <button
            onClick={nextProject}
            className='p-2 rounded-full bg-gray-200 hover:bg-gray-300'>
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Small screens: Vertical list of all projects */}
        <div className='w-full md:hidden space-y-8'>
          {projects?.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </main>
      <p className={`mt-5 md:mt-auto text-center ${latoThin.className}`}>
        Explore my work and achievements
      </p>
    </>
  )
}
