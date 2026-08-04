import { IBooking, IPaymentHistory, IUser, Service } from "./interface"

export function computeDashboardStats(
  users: IUser[] = [],
  bookings: IBooking[] = [],
  payments: IPaymentHistory[] = [],
  services: Service[] = [],
  totals?: {
    totalUsers?: number
    totalBookings?: number
    totalServices?: number
  }
) {
  const safeUsers = users ?? []
  const safeBookings = bookings ?? []
  const safePayments = payments ?? []
  const safeServices = services ?? []

  const successfulPayments = safePayments.filter((p: IPaymentHistory) => p.status === "PAID")
  const totalRevenue = successfulPayments.reduce((sum, p) => sum + p.amount, 0)

  const activeTechnicians = safeUsers.filter((u: IUser) => u.role === "TECHNICIAN").length
  const totalCustomers = safeUsers.filter((u: IUser) => u.role === "CUSTOMER").length
  const pendingBookings = safeBookings.filter((b: IBooking) => b.status === "REQUESTED").length

  // Booking status distribution
  const bookingStatusCounts = safeBookings.reduce<Record<string, number>>((acc, b) => {
    acc[b.status] = (acc[b.status] ?? 0) + 1
    return acc
  }, {})
  const bookingStatusData = Object.entries(bookingStatusCounts).map(([status, count]) => ({
    status,
    count,
  }))

  // User role distribution
  const roleCounts = safeUsers.reduce<Record<string, number>>((acc, u) => {
    acc[u.role] = (acc[u.role] ?? 0) + 1
    return acc
  }, {})
  const roleData = Object.entries(roleCounts).map(([role, count]) => ({ role, count }))

  // Revenue by month, sorted chronologically (not by string label)
  const revenueByMonth = new Map<string, number>()
  successfulPayments.forEach((p) => {
    const d = new Date(p.paidAt)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
    revenueByMonth.set(key, (revenueByMonth.get(key) ?? 0) + p.amount)
  })
  const revenueData = Array.from(revenueByMonth.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, revenue]) => {
      const [year, month] = key.split("-")
      const label = new Date(Number(year), Number(month) - 1).toLocaleString("en-US", {
        month: "short",
      })
      return { month: `${label} '${year.slice(2)}`, revenue }
    })

  return {
    totalUsers: totals?.totalUsers ?? safeUsers.length,
    totalCustomers,
    activeTechnicians,
    totalBookings: totals?.totalBookings ?? safeBookings.length,
    pendingBookings,
    totalServices: totals?.totalServices ?? safeServices.length,
    totalRevenue,
    bookingStatusData,
    roleData,
    revenueData,
  }
}