import { Banknote, Fullscreen, LayoutDashboardIcon, Podcast, UserRound } from "lucide-react";



export const customerItems = [
  {
    label: "overview",
    href: "/dashboard/customer",
    icon: LayoutDashboardIcon,
  },
  {
    label: "Bookings",
    href: "/dashboard/customer/bookings",
    icon: Podcast,
  },
  {
    label: "Payment",
    href: "/dashboard/customer/payment",
    icon: Banknote,
  },
  {
    label: "Reviews",
    href: "/dashboard/customer/review",
    icon: Fullscreen,
  },
  {
    label: "Profile",
    href: "/dashboard/customer/profile",
    icon: UserRound,
  },
]