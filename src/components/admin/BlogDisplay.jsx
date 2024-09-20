import React, { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, Edit, Trash2, EyeOff, Eye } from "lucide-react"
import Image from "next/image"
import BlogForm from "./BlogForm"
import axios from "axios"

const BlogDisplay = ({ userData }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [blogData, setBlogData] = useState(null)
  const [current, setCurrent] = useState(0)
  const [editMode, setEditMode] = useState(false)

  const mockBlogData = [
    {
      user: userData?.user?._id,
      imageUrl:
        "https://blog.kanalysis.com/wp-content/uploads/2023/01/placeholder-116.png",
      title: "Mock Blog Title",
      para: "This is a mock blog post. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: "https://example.com/blog-post",
    },
  ]

  useEffect(() => {
    if (userData) setBlogData(userData.blog)
  }, [])

  const handleEditClick = (index) => {
    setEditMode(index !== -1)
    setIsDialogOpen(true)
    setCurrent(index)
  }

  const handleDeleteClick = async (id) => {
    try {
      const res = await axios.delete(`/api/blog?id=${id}`)
      console.log(res.data)
      const newBlogData = blogData.filter((blog) => blog._id !== id)
      setBlogData(newBlogData)
    } catch (err) {
      console.log(err)
    }
  }

  const updateVisible = async (blogId, isVisible) => {
    try {
      const res = await axios.patch(`/api/blog?id=${blogId}`, { isVisible })

      setBlogData((prevBlogData) =>
        prevBlogData.map((blog) =>
          blog._id === blogId ? { ...blog, isVisible } : blog
        )
      )

      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='space-y-4'>
      <Button
        onClick={() => handleEditClick(-1)}
        className='w-full'
        variant='outline'>
        <Plus className='mr-2 h-4 w-4' /> Add Blog
      </Button>

    <div className="grid md:grid-cols-2 gap-10">
    {blogData?.map((blog, index) => (
        <Card
          key={blog._id}
          className={`${
            !blog.isVisible ? "opacity-50" : ""
          } transition-opacity duration-300`}>
          <CardHeader>
            <CardTitle className='text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text'>
              {blog.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              className='w-full h-60 object-cover rounded-md mb-4'
              src={blog.imageUrl}
              alt='blog'
              width={240}
              height={240}
            />
            <p className='text-gray-700'>{blog.para}</p>
            {blog.link && (
              <a
                href={blog.link}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 hover:underline mt-2 inline-block'>
                Read More
              </a>
            )}
          </CardContent>
          <CardFooter className='flex justify-end space-x-2'>
            <Button
              variant='outline'
              size='icon'
              onClick={() => updateVisible(blog._id, !blog.isVisible)}>
              {blog.isVisible ? (
                <EyeOff className='h-4 w-4' />
              ) : (
                <Eye className='h-4 w-4' />
              )}
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleEditClick(index)}>
              <Edit className='h-4 w-4' />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='outline' size='icon'>
                  <Trash2 className='h-4 w-4' />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the blog post.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteClick(blog._id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}
    </div>
      

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editMode ? "Edit Blog" : "Add New Blog"}</DialogTitle>
          </DialogHeader>
          <BlogForm
            current={editMode ? current : 0}
            blogData={editMode ? blogData : mockBlogData}
            setBlogData={setBlogData}
            setIsDialogOpen={setIsDialogOpen}
            editMode={editMode}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default BlogDisplay
