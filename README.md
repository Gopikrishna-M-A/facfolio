## NextAuth.js Template Readme

This is a template for a Next.js application that uses the NextAuth.js library for authentication. It provides a basic setup with Google OAuth integration, and instructions for getting started.

### Setup

1. **Environment Variables**: In the root folder, create a `.env.local` file and add the following environment variables:

   ```
   GOOGLE_CLIENT_SECRET=
   GOOGLE_CLIENT_ID=
   NEXTAUTH_SECRET=
   MONGODB_URI=
   ```

   - `GOOGLE_CLIENT_SECRET` and `GOOGLE_CLIENT_ID`: These are the client secret and client ID obtained from the Google Cloud Console when setting up a Google OAuth application.
   - `NEXTAUTH_SECRET`: This is a secret key used by NextAuth.js for encryption and signing.It can be any string, but it's recommended to use a long, random, and secure string for            security purposes.
   - `MONGODB_URI`: The connection string for your MongoDB database, used for session management.

2. **Install Dependencies**: In the terminal, run the following command to install the required dependencies:

   ```
   npm install
   ```

### Running the Application

To start the development server, run the following command:

```
npm run dev
```

This will start the Next.js development server and make your application available at `http://localhost:3000`.

### Usage

The template includes a basic setup for Google OAuth authentication. Users can sign in using their Google accounts, and their session information is stored in the MongoDB database.

The main pages and components are:

- `src/app/api/auth/[...nextauth]/route.js`: The NextAuth.js API route handler.
- `src/app/page.jsx`: The home page, has links to the "server page" and "client page", buttons to sign in and sign out
- `src/app/serverpagesample/page.jsx`: A server-side rendered page.
- `src/app/clientpagesample/page.jsx`: A client-side rendered page.
- `src/hooks/useAuth.js`: A custom hook that provides authentication-related information.
- `src/components/AuthProvider.jsx`: A provider component that wraps the application with the NextAuth.js session provider.

You can customize this template further by adding more pages, components, and functionality as needed for your project.



