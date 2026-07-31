import { ChartColumn, ChartNoAxesCombined, LayoutDashboardIcon, Podcast, UserRound, Users } from "lucide-react";



export const adminItems = [
  {
    label: "overview",
    href: "/dashboard/admin",
    icon: LayoutDashboardIcon,
  },
  {
    label: "Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    label: "Bookings",
    href: "/dashboard/admin/bookings",
    icon: Podcast,
  },
  {
    label: "Categories",
    href: "/dashboard/admin/categories",
    icon: ChartColumn,
  },
  {
    label: "Reposrts",
    href: "/dashboard/admin/reports",
    icon: ChartNoAxesCombined,
  },
  {
    label: "Profile",
    href: "/dashboard/admin/profile",
    icon: UserRound,
  },
]