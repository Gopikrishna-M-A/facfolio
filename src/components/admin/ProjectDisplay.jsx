import React, { useEffect, useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
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
import axios from "axios"
import ProjectForm from "./ProjectsForm"

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const ProjectDisplay = ({ userData }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [projectData, setProjectData] = useState(null)
  const [current, setCurrent] = useState(0)
  const [editMode, setEditMode] = useState(false)

  const mockProjectData = [
    {
      user: userData?.user?._id,
      title: "Mock Project Title",
      description: "This is a mock project description.",
      link: "https://example.com/project",
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      tags: ["Mock Tag1", "Mock Tag2"],
      fundingSources: ["Mock Funding Source1", "Mock Funding Source2"],
      fundingAmount: 50000,
      collaborators: ["Collaborator1", "Collaborator2"],
      publications: [
        {
          title: "Mock Publication Title",
          authors: ["Author1", "Author2"],
          conference: "Mock Conference",
          year: 2022,
        },
      ],
    },
  ]

  useEffect(() => {
    if (userData) setProjectData(userData.project)
  }, [userData?.project])

  const handleEditClick = (index) => {
    setEditMode(index !== -1)
    setIsDialogOpen(true)
    setCurrent(index)
  }

  const handleDeleteClick = async (id) => {
    try {
      const res = await axios.delete(`/api/project?id=${id}`)
      console.log(res.data)
      const newData = projectData.filter((project) => project._id !== id)
      setProjectData(newData)
    } catch (err) {
      console.log(err)
    }
  }

  const updateVisible = async (projectId, isVisible) => {
    try {
      const res = await axios.patch(`/api/project?id=${projectId}`, {
        isVisible,
      })
      setProjectData((prevProjectData) =>
        prevProjectData.map((project) =>
          project._id === projectId ? { ...project, isVisible } : project
        )
      )
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  console.log("projectData", projectData)

  return (
    <div className='space-y-4'>
      <Button
        onClick={() => handleEditClick(-1)}
        className='w-full'
        variant='outline'>
        <Plus className='mr-2 h-4 w-4' /> Add Project
      </Button>

      <div className="grid md:grid-cols-2 gap-10">

      {projectData?.map((project, index) => (
        <Card
          key={project._id}
          className={`${
            !project.isVisible ? "opacity-50" : ""
          } transition-opacity duration-300`}>
          <CardContent className='pt-6'>
            <h2 className='text-2xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text'>
              {project.title}
            </h2>
            <p className='text-gray-600 mb-2'>{project.description}</p>
            {project.link && (
              <a
                href={project.link}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 hover:underline mb-2 block'>
                Project Link
              </a>
            )}
            <p className='mb-2'>
              <strong>Start Date:</strong> {formatDate(project.startDate)},{" "}
              <strong>End Date:</strong> {formatDate(project.endDate)}
            </p>
            {project.tags && (
              <p className='mb-2'>
                <strong>Tags:</strong> {project.tags.join(", ")}
              </p>
            )}
            {project.fundingSources && (
              <p className='mb-2'>
                <strong>Funding Sources:</strong>{" "}
                {project.fundingSources.join(", ")}
              </p>
            )}
            {project.fundingAmount && (
              <p className='mb-2'>
                <strong>Funding Amount:</strong> ₹{project.fundingAmount}
              </p>
            )}
            {project.collaborators && (
              <p className='mb-2'>
                <strong>Collaborators:</strong>{" "}
                {project.collaborators.join(", ")}
              </p>
            )}
            {project.publications && (
              <div>
                <strong>Publications:</strong>
                {project.publications.map((publication, pubIndex) => (
                  <p key={pubIndex} className='ml-4'>
                    {`${publication.title} (${
                      publication.year
                    }) - ${publication.authors.join(", ")} - ${
                      publication.conference
                    }`}
                  </p>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className='flex justify-end space-x-2'>
            <Button
              variant='outline'
              size='icon'
              onClick={() => updateVisible(project._id, !project.isVisible)}>
              {project.isVisible ? (
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
                    the project.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteClick(project._id)}>
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
        <DialogContent className='max-h-[80vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>
              {editMode ? "Edit Project" : "Add New Project"}
            </DialogTitle>
          </DialogHeader>
          <ProjectForm
            current={editMode ? current : 0}
            projectData={editMode ? projectData : mockProjectData}
            setProjectData={setProjectData}
            setIsDialogOpen={setIsDialogOpen}
            editMode={editMode}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProjectDisplay
