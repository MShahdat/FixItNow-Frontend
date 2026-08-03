


import { Card, CardContent } from "@/components/ui/card";

import { CirclePoundSterling, ClipboardList, Clock, Loader, CheckCircle2 } from "lucide-react";
import { Booking, BookingTech, IncomingBook } from "@/lib/interface";
import MyBookingLists from "../_components/customer/MyBookingLists";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getMe } from "@/services/getMe";
import { fullName } from "@/services/fullName";
import { getBookingByTechnician } from "../_action/getBookingByTechnician";
import { getMyServices } from "../_action/getMyservices";
import IncomingBooking from "../_components/technicians/incomingBooking";
import { incomingBooking } from "../_action/incommingBooking";


// const PAID_STATUS = "PAID";

const TechnicianDashboardPage = async ({
  searchParams,
}:
  { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

  const search = await searchParams

  const bookings = await getBookingByTechnician(search)
  const services = await getMyServices()

  // console.log('technician services ', services)
  // console.log('technician bookings', bookings)


  const me = await getMe()
  const name = fullName(me)

  const incommingBook = await incomingBooking()
  console.log('cincommingo boking ', incommingBook)



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
    <div className="max-w-7xl mx-auto px-2 py-10">
      <div className="flex flex-col space-y-8">
        <p className="text-2xl text-center md:text-3xl xl:text-4xl font-semibold pb-8">Welcome Back, {name}</p>

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

        <div className="mt-10 space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xl md:text-2xl font-bold text-primary">New Incomming Bookings</p>
            <Link href={'/dashboard/technician/service'}>
              <Button variant={"default"}>Create Service</Button>
            </Link>
          </div>
          <div className="space-y-6 flex flex-col ">
            {incommingBook?.data?.length ? (
              incommingBook.data.map((b: IncomingBook) => (
                <IncomingBooking key={b.bookingId} booking={b} />
              ))
            ) : (
              <p className="py-12 text-center text-red-700">No incoming booking exist</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianDashboardPage;