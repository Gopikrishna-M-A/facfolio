import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import About from '@/models/about';

export async function GET(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const about = await About.findById(id);
    if (!about) {
      return NextResponse.json({ message: 'About entry not found' }, { status: 404 });
    }
    return NextResponse.json(about);
  } else {
    const allAboutEntries = await About.find();
    return NextResponse.json({ aboutEntries: allAboutEntries });
  }
}

export async function POST(request) {
  await dbConnect();
  const aboutData = await request.json();
  const newAboutEntry = await About.create(aboutData);
  return NextResponse.json({ about: newAboutEntry }, { status: 201 });
}

export async function PATCH(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const updatedAboutData = await request.json();

  const updatedAbout = await About.findByIdAndUpdate(id, updatedAboutData, { new: true });
  if (!updatedAbout) {
    return NextResponse.json({ message: 'About entry not found' }, { status: 404 });
  }
  return NextResponse.json({ about: updatedAbout });
}

export async function DELETE(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const deletedAbout = await About.findByIdAndDelete(id);
  if (!deletedAbout) {
    return NextResponse.json({ message: 'About entry not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'About entry deleted successfully' });
}