import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Research from '@/models/research';

export async function GET(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const research = await Research.findById(id);
    if (!research) {
      return NextResponse.json({ message: 'Research entry not found' }, { status: 404 });
    }
    return NextResponse.json(research);
  } else {
    const allResearchEntries = await Research.find();
    return NextResponse.json({ researchEntries: allResearchEntries });
  }
}

export async function POST(request) {
  await dbConnect();
  const researchData = await request.json();
  const newResearchEntry = await Research.create(researchData);
  return NextResponse.json({ research: newResearchEntry }, { status: 201 });
}

export async function PATCH(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const updatedResearchData = await request.json();

  const updatedResearch = await Research.findByIdAndUpdate(id, updatedResearchData, { new: true });
  if (!updatedResearch) {
    return NextResponse.json({ message: 'Research entry not found' }, { status: 404 });
  }
  return NextResponse.json({ research: updatedResearch });
}

export async function DELETE(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const deletedResearch = await Research.findByIdAndDelete(id);
  if (!deletedResearch) {
    return NextResponse.json({ message: 'Research entry not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Research entry deleted successfully' });
}