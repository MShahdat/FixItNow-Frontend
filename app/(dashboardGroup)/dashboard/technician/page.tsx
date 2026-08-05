


import { Card, CardContent } from "@/components/ui/card";

import { CirclePoundSterling, ClipboardList, Clock, Loader, CheckCircle2 } from "lucide-react";
import { Booking, BookingTech, IncomingBook } from "@/lib/interface";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getMe } from "@/services/getMe";
import { fullName } from "@/services/fullName";
import { getBookingByTechnician } from "../_action/getBookingByTechnician";
import { getMyServices } from "../_action/getMyservices";
import IncomingBooking from "../_components/technicians/incomingBooking";
import { incomingBooking } from "../_action/incommingBooking";
import DashboardStats from "../_components/technicians/DashboardStats";


// const PAID_STATUS = "PAID";

const TechnicianDashboardPage = async ({
  searchParams,
}:
  { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

  const search = await searchParams

  const me = await getMe()
  const name = fullName(me)

  const incommingBook = await incomingBooking()
  console.log('cincommingo boking ', incommingBook)


  return (
    <div className="max-w-7xl mx-auto px-2 py-10">
      <div className="flex flex-col space-y-8">
        <p className="text-2xl text-center md:text-3xl xl:text-4xl font-semibold pb-8">Welcome Back, {name}</p>

        <DashboardStats searchParams={search} />


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