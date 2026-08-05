


import { Card, CardContent } from "@/components/ui/card";

import { Calendar, BarChart3, CirclePoundSterling, ClipboardList, Clock, Loader, CheckCircle2 } from "lucide-react";
import { getMyPayment } from "../_action/customer/myPayment";
import { getMyBookings } from "../_action/customer/myBookings";
import { Booking } from "@/lib/interface";
import MyBookingLists from "../_components/customer/MyBookingLists";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getMe } from "@/services/getMe";
import { fullName } from "@/services/fullName";
import { toast } from "sonner";


const PAID_STATUS = "PAID";

const DashboardPage = async ({
  searchParams,
}:
  { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

  const search = await searchParams

  const payments = await getMyPayment();
  const bookings = await getMyBookings(search)

  if (!payments.success || bookings.success) {
    return (
      console.log('no payment or booking found')
    )
  }




  // console.log('my bookings ', bookings)

  const allBooking = bookings?.data ?? []

  const me = await getMe()
  const name = fullName(me)

  const succeeded = payments?.data?.filter(
    (p: any) => p.status === PAID_STATUS && p.paidAt
  );

  const totalSpend = succeeded.reduce((sum: number, p: any) => sum + p.amount, 0);

  const totBooking = allBooking.length;
  const requestedBooking = allBooking.filter((b: Booking) => b.status === "REQUESTED").length;
  const inProgressBooking = allBooking.filter((b: Booking) => b.status === "IN_PROGRESS").length;
  const completedBooking = allBooking.filter((b: Booking) => b.status === "COMPLETED").length;


  const stats = [
    {
      label: "Total Booking",
      value: totBooking,
      unit: "",
      icon: ClipboardList,
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Requested Booking",
      value: requestedBooking,
      unit: "",
      icon: Clock,
      iconBg: "bg-amber-100 dark:bg-amber-900/30",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      label: "In-Progress Booking",
      value: inProgressBooking,
      unit: "",
      icon: Loader,
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      label: "Completed Booking",
      value: completedBooking,
      unit: "",
      icon: CheckCircle2,
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      label: "Total Spend",
      value: totalSpend,
      unit: "tk",
      icon: CirclePoundSterling,
      iconBg: "bg-rose-100 dark:bg-rose-900/30",
      iconColor: "text-rose-600 dark:text-rose-400",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-2 py-10">
      <div className="flex flex-col space-y-6">
        <p className="text-2xl text-center md:text-3xl xl:text-4xl font-semibold pb-8">Welcome Backe, {name}</p>

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
            <p className="text-xl md:text-2xl font-bold text-primary">Recent Bookings</p>
            <Link href={'/services'}>
              <Button variant={"default"}>New Booking</Button>
            </Link>
          </div>
          <MyBookingLists searchParams={search} limit={3} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;