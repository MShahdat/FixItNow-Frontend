'use client'


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { customerItems } from "../_config/customerItems";
import { technicianItems } from "../_config/technicianItems";
import { adminItems } from "../_config/adminItems";
import { Fullscreen, LogOut, Settings, UserRound } from "lucide-react";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { logout } from "@/app/(authGroup)/_action/logoutAction";


const sidebarManuItems = {
  CUSTOMER: customerItems,
  TECHNICIAN: technicianItems,
  ADMIN: adminItems
}


export function DashboardSidebar({ user }: any) {

  let navItems: any = {}

  if (user?.data?.role === 'CUSTOMER') {
    navItems = sidebarManuItems.CUSTOMER
  }
  else if (user?.data?.role === 'TECHNICIAN') {
    navItems = sidebarManuItems.TECHNICIAN
  } else {
    navItems = sidebarManuItems.ADMIN
  }

  const pathname = usePathname();
  const router = useRouter()

  const handleLogout = async (action: string) => {
    console.log('clike logout')
    if (action === 'logout') {
      await logout()
      toast.success('Logout successfully')
      router.push('/login')
    }

  }
  return (
    // <Sidebar variant="floating" collapsible="icon" className=" h-[calc(100svh-0rem)] border-r border-sidebar-border">
    <Sidebar variant="floating" collapsible="icon" className=" h-[92vh] border-r border-sidebar-border">
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <div className="text-xl font-medium group-data-[collapsible=icon]:hidden truncate pl-2">
            Dashboard
          </div>
          <div className="">
            <SidebarTrigger />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item: any) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.label} >
                    <Link href={item.href} className="flex items-center gap-2">
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <DropdownMenuSeparator className="bg-neutral-200" />
      <SidebarFooter className="pb-12">

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link href={'/settings'} className="flex items-center gap-2">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => {
              handleLogout('logout')
            }}>
              <div className="text-red-600 flex items-center gap-2">
                <LogOut />
                <span>Logout</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}