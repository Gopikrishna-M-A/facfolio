import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import User from "@/models/user"

export async function GET(request) {
  await dbConnect()

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const email = searchParams.get("email")
  const slug = searchParams.get("slug")

  if (id) {
    const user = await User.findById(id)
    return NextResponse.json(user)
  } else if (email) {
    const user = await User.findOne({ email })
    return NextResponse.json(user)
  } else if (slug) {
    const user = await User.findOne({ slug })
    return NextResponse.json(user)
  } else {
    const users = await User.find()
    return NextResponse.json(users)
  }
}

export async function POST(request) {
  await dbConnect()
  const userData = await request.json()
  const { email, name, ImageUrl } = userData

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return NextResponse.json(
      { message: "User with this email already exists", user: existingUser },
      { status: 200 }
    )
  }

  // Generate a unique slug
  let baseSlug = name.toLowerCase().replace(/ /g, "-")
  let slug = baseSlug
  let counter = 1

  while (await User.findOne({ slug })) {
    slug = `${baseSlug}-${counter}`
    counter++
  }

  userData.slug = slug

  const newUser = await User.create(userData)
  return NextResponse.json(newUser, { status: 201 })
}

export async function PATCH(request) {
  await dbConnect()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const updatedData = await request.json()

  const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
    new: true,
  })
  return NextResponse.json(updatedUser)
}

export async function DELETE(request) {
  await dbConnect()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  await User.findByIdAndRemove(id)
  return NextResponse.json({ message: "User deleted successfully" })
}