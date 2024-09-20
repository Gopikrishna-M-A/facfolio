"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import HomeDisplay from "./admin/HomeDisplay"
import AboutDisplay from "./admin/AboutDisplay"
import ResearchDisplay from "./admin/ResearchDisplay"
import ProjectDisplay from "./admin/ProjectDisplay"
import BlogDisplay from "./admin/BlogDisplay"
import ProfileDisplay from "./admin/ProfileDisplay"
import { useCurrentPage } from "@/contexts/CurrentPageContext"
import ThemeCustomization from "./admin/ThemeCustomization"

const AdminPage = ({ user }) => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  const { currentPage } = useCurrentPage()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/info?slug=${user.slug}`)
        const data = await response.data
        setUserData(data)
      } catch (err) {
        console.log("error", err)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [user.slug])

  const renderContent = () => {
    switch (currentPage) {
      case "Theme":
        return <ThemeCustomization userData={userData} />
      case "Profile":
        return <ProfileDisplay userData={userData} />
      case "Home":
        return <HomeDisplay userData={userData} />
      case "About":
        return <AboutDisplay userData={userData} />
      case "Research":
        return <ResearchDisplay userData={userData} />
      case "Project":
        return <ProjectDisplay userData={userData} />
      case "Blog":
        return <BlogDisplay userData={userData} />
      case "Contact":
        return "contact"
      default:
        return <HomeDisplay userData={userData} />
    }
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        Loading...
      </div>
    )
  }

  return (
    <div className='p-6'>
      <div className='flex-1'>{renderContent()}</div>
    </div>
  )
}

export default AdminPage
