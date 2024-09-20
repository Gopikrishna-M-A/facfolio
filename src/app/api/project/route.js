import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Project from '@/models/project';

export async function GET(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ message: 'Project entry not found' }, { status: 404 });
    }
    return NextResponse.json(project);
  } else {
    const allProjectEntries = await Project.find();
    return NextResponse.json({ projectEntries: allProjectEntries });
  }
}

export async function POST(request) {
  await dbConnect();
  const projectData = await request.json();
  const newProjectEntry = await Project.create(projectData);
  return NextResponse.json({ project: newProjectEntry }, { status: 201 });
}

export async function PATCH(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const updatedProjectData = await request.json();

  const updatedProject = await Project.findByIdAndUpdate(id, updatedProjectData, { new: true });
  if (!updatedProject) {
    return NextResponse.json({ message: 'Project entry not found' }, { status: 404 });
  }
  return NextResponse.json({ project: updatedProject });
}

export async function DELETE(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const deletedProject = await Project.findByIdAndDelete(id);
  if (!deletedProject) {
    return NextResponse.json({ message: 'Project entry not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Project entry deleted successfully' });
}