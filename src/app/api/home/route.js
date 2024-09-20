import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Home from '@/models/home';

export async function GET(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const userId = searchParams.get('userId');

  if (id) {
    const home = await Home.findById(id);
    if (!home) {
      return NextResponse.json({ message: 'Home entry not found' }, { status: 404 });
    }
    return NextResponse.json(home);
  } else if (userId) {
    const home = await Home.findOne({ user: userId });
    if (!home) {
      return NextResponse.json({ message: 'Home entry not found' }, { status: 404 });
    }
    return NextResponse.json(home);
  } else {
    const allHomeEntries = await Home.find();
    return NextResponse.json({ homeEntries: allHomeEntries });
  }
}

export async function POST(request) {
  await dbConnect();
  const homeData = await request.json();
  const newHomeEntry = await Home.create(homeData);
  return NextResponse.json({ home: newHomeEntry }, { status: 201 });
}

export async function PATCH(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const updatedHomeData = await request.json();

  const updatedHome = await Home.findByIdAndUpdate(id, updatedHomeData, { new: true });
  if (!updatedHome) {
    return NextResponse.json({ message: 'Home entry not found' }, { status: 404 });
  }
  return NextResponse.json({ home: updatedHome });
}

export async function DELETE(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const deletedHome = await Home.findByIdAndDelete(id);
  if (!deletedHome) {
    return NextResponse.json({ message: 'Home entry not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Home entry deleted successfully' });
}