"use client"
import Link from "next/link"
import {
  Bell,
  BookOpen,
  Briefcase,
  ExternalLink,
  FileText,
  Home,
  Menu,
  MessageCircle,
  Package2,
  Palette,
  Search,
  User,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCurrentPage } from "@/contexts/CurrentPageContext"
import { useAuth } from "@/hooks/useAuth"
import { signOut } from "next-auth/react"

export default function Sidebar({ children }) {
  const { currentPage, setCurrentPage } = useCurrentPage()
  const { user, isLoading, isAuthenticated } = useAuth()

  const navItems = [
    { name: "Theme", icon: Palette },
    { name: "Profile", icon: User },
    { name: "Home", icon: Home },
    { name: "About", icon: FileText },
    { name: "Research", icon: BookOpen },
    { name: "Project", icon: Briefcase },
    { name: "Blog", icon: FileText },
    { name: "Contact", icon: MessageCircle },
  ]

  const handleNavClick = (pageName) => {
    setCurrentPage(pageName)
  }

  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <div className='hidden border-r bg-muted/40 md:block'>
        <div className='flex h-full max-h-screen flex-col gap-2'>
          <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
            <Link href='/' className='flex items-center gap-2 font-semibold'>
              <Package2 className='h-6 w-6' />
              <span className=''>Facfolio</span>
            </Link>
            <Button variant='outline' size='icon' className='ml-auto h-8 w-8'>
              <Bell className='h-4 w-4' />
              <span className='sr-only'>Toggle notifications</span>
            </Button>
          </div>
          <div className='flex-1'>
            <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href='#'
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    currentPage === item.name
                      ? "bg-muted text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => handleNavClick(item.name)}>
                  <item.icon className='h-4 w-4' />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className='mt-auto p-4'>
            <Card>
              <CardHeader className='p-2 pt-0 md:p-4'>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className='p-2 pt-0 md:p-4 md:pt-0'>
                <Button size='sm' className='w-full'>
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className='flex flex-col h-screen'>
        <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='shrink-0 md:hidden'>
                <Menu className='h-5 w-5' />
                <span className='sr-only'>Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='flex flex-col'>
              <nav className='grid gap-2 text-lg font-medium'>
                <Link
                  href='#'
                  className='flex items-center gap-2 text-lg font-semibold'>
                  <Package2 className='h-6 w-6' />
                  <span className='sr-only'>Facfolio</span>
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href='#'
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                      currentPage === item.name
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => handleNavClick(item.name)}>
                    <item.icon className='h-5 w-5' />
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className='mt-auto'>
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size='sm' className='w-full'>
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className='w-full flex-1 '>
            <form className='hidden'>
              <div className='relative'>
                <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  type='search'
                  placeholder='Search products...'
                  className='w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3'
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary' size='icon' className='rounded-full'>
                <Avatar>
                  <AvatarImage src={user?.image} alt={user?.name} />
                  <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                </Avatar>
                <span className='sr-only'>Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className='flex-1 overflow-auto p-4 lg:p-6'>
          <div className='h-full flex flex-col'>
            <div className='flex items-center justify-between mb-4'>
              <div>
                <h1 className='text-2xl font-semibold'>{user?.name}</h1>
                <p className='text-sm text-muted-foreground'>Admin Dashboard</p>
              </div>
              <Button variant='outline' size='sm' asChild>
                <a
                  href={`/portfolio/${user?.slug}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center space-x-2'>
                  <span>View Portfolio</span>
                  <ExternalLink className='h-4 w-4' />
                </a>
              </Button>
            </div>
            <div className='flex-1 rounded-lg border border-dashed shadow-sm overflow-auto'>
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
