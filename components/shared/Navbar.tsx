"use client"

import Link from "next/link"
import {
  Command,
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  User,
  CreditCard,
  LifeBuoy,
  LogOut,
  Menu,
  Crown,
  Newspaper,
  Contact,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { logout } from "@/service/logout"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { NavbarProps } from "@/lib/interface"
import { fullName } from "@/services/fullName"
import { logout } from "@/app/(authGroup)/_action/logoutAction"

const navLinks = [
  { label: "Home", href: "/", icon: LayoutDashboard },
  { label: "Services", href: "/services", icon: BarChart3 },
  { label: "Technicians", href: "/technicians", icon: BarChart3 },
  { label: "About", href: "/about", icon: FolderKanban },
  { label: "Contact", href: "/contact", icon: Contact },
] as const

export function Navbar({ user }: NavbarProps) {
  const role = user?.data?.role
  const name = fullName(user)
  const router = useRouter()

  // Moved inside the component — no more shared module-level mutable state
  let userMenuItems: { label: string; href: string; icon: typeof User }[] = []

  if (user.success) {
    const roleHref: Record<string, string> = {
      ADMIN: "/dashboard/admin",
      TECHNICIAN: "/dashboard/technician",
      CUSTOMER: "/dashboard/customer",
    }

    const dashboardHref = roleHref[role] ?? "/"

    userMenuItems = [
      { label: "Profile", href: `${dashboardHref}/profile`, icon: User },
      { label: "Dashboard", href: dashboardHref, icon: LayoutDashboard },
      { label: "Support", href: "/support", icon: LifeBuoy },
    ]
  }


  const handleLogout = async (action: string) => {
    console.log('clike logout')
    if (action === 'logout') {
      await logout()
      toast.success('Logout successfully')
      router.push('/login')
    }

  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <div>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Command className="size-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight">Press</span>
          </Link>
        </div>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {navLinks.map((link) => {
            const Icon = link.icon
            return (
              <Button key={link.href} variant="ghost" size="sm" asChild>
                <Link href={link.href}>
                  <Icon data-icon="inline-start" />
                  {link.label}
                </Link>
              </Button>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Mobile nav */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuGroup>
                {navLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link href={link.href}>
                        <Icon />
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {user.success ? (
            <div className="flex items-center gap-2">
              {/* User dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    aria-label="User menu"
                  >
                    <Avatar className="size-8">
                      <AvatarImage
                        src={user?.data?.profileImage}
                        alt="profileImge"
                      />
                      <AvatarFallback>👦🏻</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-white text-neutral-900"
                >
                  <div className="flex flex-col px-1.5 py-1.5">
                    <span className="text-sm font-medium text-neutral-900">
                      {name}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {user?.data?.email}
                    </span>
                  </div>
                  <DropdownMenuSeparator className="bg-neutral-200" />
                  <DropdownMenuGroup>
                    {userMenuItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <DropdownMenuItem
                          key={item.href}
                          asChild
                          className="text-neutral-900 focus:bg-neutral-300 focus:text-neutral-900 [&_svg]:!text-neutral-900 [&_svg_*]:!text-neutral-900"
                        >
                          <Link href={item.href}>
                            <Icon />
                            {item.label}
                          </Link>
                        </DropdownMenuItem>
                      )
                    })}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-neutral-200" />
                  <DropdownMenuItem
                    onClick={() => {
                      handleLogout('logout')
                    }}
                    className="!text-red-600 focus:bg-red-50 focus:!text-red-600 [&_svg]:!text-red-600 [&_svg_*]:!text-red-600"
                  >
                    <LogOut />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}