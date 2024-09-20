import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import User from "@/models/user"
import Home from "@/models/home";  
import About from "@/models/about";
import dbConnect from "@/lib/dbConnect"
import slugify from "slugify"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    brandColor: "#2F2E2E", // Hex color code
    logo: "", // Absolute URL to image
  },
  callbacks: {
    async session({ session, user }) {
      if (session?.user) {
        await dbConnect();
        
        // Find the existing user by email
        const existingUser = await User.findOne({ email: user.email });

        if (existingUser) {
          // Manually generate slug if it doesn't exist
          if (!existingUser.slug) {
            let baseSlug = slugify(existingUser.name, { lower: true, strict: true });
            let slug = baseSlug;
            let counter = 1;
  
            // Check if the slug already exists and append a counter if necessary
            while (await User.findOne({ slug })) {
              slug = `${baseSlug}-${counter}`;
              counter++;
            }

            // Update user with the generated slug
            existingUser.slug = slug;
            await existingUser.save();
  
            console.log('Generated slug for user:', slug);
          }
          
          // Check and create Home document if it doesn't exist
          const existingHome = await Home.findOne({ user: existingUser._id });
          if (!existingHome) {
            await Home.create({ user: existingUser._id });
            console.log(`Home document created for user: ${existingUser._id}`);
          }

          // Check and create About document if it doesn't exist
          const existingAbout = await About.findOne({ user: existingUser._id });
          if (!existingAbout) {
            await About.create({ user: existingUser._id });
            console.log(`About document created for user: ${existingUser._id}`);
          }

          // Add the slug and id to the session object
          session.user.id = existingUser._id;
          session.user.slug = existingUser.slug;
        }
      }
      return session;
    },
  },
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
}
