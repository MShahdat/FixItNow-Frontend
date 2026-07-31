import { CalendarDays, LayoutDashboardIcon, Podcast, UserRound, Wrench, WrenchOff } from "lucide-react";



export const technicianItems = [
  {
    label: "Overview",
    href: "/dashboard/technician",
    icon: LayoutDashboardIcon,
  },
  {
    label: "services",
    href: "/dashboard/technician/service",
    icon: WrenchOff,
  },
  {
    label: "Bookings",
    href: "/dashboard/technician/bookings",
    icon: Podcast,
  },
  {
    label: "Availability",
    href: "/dashboard/technician/availability",
    icon: CalendarDays,
  },
  {
    label: "Profile",
    href: "/dashboard/technician/profile",
    icon: UserRound,
  },
]