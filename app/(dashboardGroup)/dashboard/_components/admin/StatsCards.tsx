import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Wrench, CalendarClock, DollarSign, Clock, ListChecks } from "lucide-react"

interface StatsCardsProps {
  stats: {
    totalUsers: number
    activeTechnicians: number
    totalBookings: number
    pendingBookings: number
    totalServices: number
    totalRevenue: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  const items = [
    {
      label: "Total Revenue",
      value: `৳${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      iconColor: "text-emerald-500",
      valueColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Total Bookings",
      value: stats.totalBookings,
      icon: CalendarClock,
      iconColor: "text-blue-500",
      valueColor: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Requested Bookings",
      value: stats.pendingBookings,
      icon: Clock,
      iconColor: "text-amber-500",
      valueColor: "text-amber-600 dark:text-amber-400",
    },
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      iconColor: "text-violet-500",
      valueColor: "text-violet-600 dark:text-violet-400",
    },
    {
      label: "Total Technicians",
      value: stats.activeTechnicians,
      icon: Wrench,
      iconColor: "text-orange-500",
      valueColor: "text-orange-600 dark:text-orange-400",
    },
    {
      label: "Total Services",
      value: stats.totalServices,
      icon: ListChecks,
      iconColor: "text-rose-500",
      valueColor: "text-rose-600 dark:text-rose-400",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Card key={item.label}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.label}
            </CardTitle>
            <item.icon className={`h-4 w-4 ${item.iconColor}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${item.valueColor}`}>{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}