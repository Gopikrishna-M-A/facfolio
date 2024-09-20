import { redirect } from 'next/navigation'
import AdminPage from "../../components/AdminPage"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function getCurrentUser() {
  const session = await getSession()
  return session?.user
}

const Page = async () => {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/')
  }

  return <AdminPage user={user} />
}

export default Page