import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/user';
import Home from '@/models/home';
import About from '@/models/about';
import Research from '@/models/research';
import Project from '@/models/project';
import Blog from '@/models/blog';

export async function GET(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")
  
  const user = await User.findOne({ slug });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const home = await Home.findOne({ user: user._id });
  const about = await About.findOne({ user: user._id });
  const research = await Research.find({ user: user._id, isVisible: true });
  const project = await Project.find({ user: user._id, isVisible: true });
  const blog = await Blog.find({ user: user._id, isVisible: true });

  const userData = {
    user,
    home,
    about,
    research,
    project,
    blog,
  };

  return NextResponse.json(userData);
}