import { BookingTech } from "@/lib/interface";
import { getBookingByTechnician } from "../../_action/getBookingByTechnician";
import { getMyServices } from "../../_action/getMyservices";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList, Clock, Loader } from "lucide-react";



const DashboardStats = async (searchParams: any) => {

  const bookings = await getBookingByTechnician(searchParams)
  const services = await getMyServices(searchParams)

  const totService = Array.isArray(services?.data) ? services.data.length : 0
  const allBooking = Array.isArray(bookings?.data) ? bookings.data : []

  const completedJobs = allBooking.filter((b: BookingTech) => b.status === "COMPLETED")
  const requested = allBooking.filter((b: BookingTech) => b.status === "REQUESTED").length
  const inProgress = allBooking.filter((b: BookingTech) => b.status === "IN_PROGRESS").length

  const completed = completedJobs.length

  console.log('completed jobs by technician', completedJobs)

  const totEarn = completedJobs.reduce((sum: number, p: BookingTech) => sum + Number(p.totalAmount || 0), 0);

  const stats = [
    {
      label: "Total Services",
      value: totService,
      unit: "",
      icon: ClipboardList,
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Completed Jobs",
      value: completed,
      unit: "",
      icon: ClipboardList,
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Requested Booking",
      value: requested,
      unit: "",
      icon: Clock,
      iconBg: "bg-amber-100 dark:bg-amber-900/30",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      label: "In-Progress Booking",
      value: inProgress,
      unit: "",
      icon: Loader,
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      label: "Total Earning",
      value: totEarn,
      unit: "",
      icon: ClipboardList,
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
  ];


  return (
    <div className="max-w-6xl flex flex-wrap justify-evenly gap-6">
      {stats.map(({ label, value, icon: Icon, iconBg, iconColor, unit }) => (
        <Card key={label} className="w-[200px]">
          <CardContent className="flex flex-col items-center text-center">
            <div className={`flex h-9 w-9 items-center justify-center rounded-full ${iconBg} mb-2.5`}>
              <Icon className={`h-[18px] w-[18px] ${iconColor}`} />
            </div>
            <p className="text-sm text-muted-foreground mb-1">{label}</p>
            <p className="text-xl font-semibold">
              {value.toLocaleString()} {unit}

            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;