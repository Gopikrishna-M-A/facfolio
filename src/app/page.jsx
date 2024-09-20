'use client'
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { useAuth } from "@/hooks/useAuth"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

const Page = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin')
    }
  }, [isAuthenticated, router])

  if (isLoading) {
    return <div className="w-screen h-screen flex justify-center items-center">Loading...</div>
  }

  if (isAuthenticated) {
    return null // This will briefly show while redirecting to /admin
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Create Your Portfolio</h1>
        <p className="text-xl text-gray-600">Showcase your work with a beautiful online portfolio</p>
      </div>
      <Button onClick={() => signIn()} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Get Started
      </Button>
    </div>
  )
}

export default Page