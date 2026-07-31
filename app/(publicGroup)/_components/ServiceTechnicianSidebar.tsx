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
import { Podcast, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";


const ServiceTechnicianSidebar = () => {
  const pathname = usePathname()

  return (
    // <Sidebar variant="floating" collapsible="icon" className=" h-[calc(100svh-0rem)] border-r border-sidebar-border">
    <Sidebar variant="floating" collapsible="icon" className=" h-[92vh] border-r border-sidebar-border">
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <div className="text-xl font-medium group-data-[collapsible=icon]:hidden truncate pl-2">
            Filtering
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

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ServiceTechnicianSidebar;