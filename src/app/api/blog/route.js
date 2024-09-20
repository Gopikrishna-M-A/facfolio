import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/blog';

export async function GET(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ message: 'Blog entry not found' }, { status: 404 });
    }
    return NextResponse.json(blog);
  } else {
    const allBlogEntries = await Blog.find();
    return NextResponse.json({ blogEntries: allBlogEntries });
  }
}

export async function POST(request) {
  await dbConnect();
  const blogData = await request.json();
  const newBlogEntry = await Blog.create(blogData);
  return NextResponse.json({ blog: newBlogEntry }, { status: 201 });
}

export async function PATCH(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const updatedBlogData = await request.json();

  const updatedBlog = await Blog.findByIdAndUpdate(id, updatedBlogData, { new: true });
  if (!updatedBlog) {
    return NextResponse.json({ message: 'Blog entry not found' }, { status: 404 });
  }
  return NextResponse.json({ blog: updatedBlog });
}

export async function DELETE(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const deletedBlog = await Blog.findByIdAndDelete(id);
  if (!deletedBlog) {
    return NextResponse.json({ message: 'Blog entry not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Blog entry deleted successfully' });
}