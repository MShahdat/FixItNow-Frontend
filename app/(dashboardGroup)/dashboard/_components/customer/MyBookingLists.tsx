
import { Booking } from "@/lib/interface";
import { getMyBookings } from "../../_action/customer/myBookings";
import { MyBookingCard } from "./MyBookingCard";

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  },
  limit?: number
};


const MyBookingLists = async ({ searchParams, limit }: Props) => {

  const Bookings = await getMyBookings(searchParams)
  // console.log('customer bookings ', bookings)


  if (!Bookings.success || !Bookings.data?.length) {
    return (
      <p className="py-12 text-center text-red-700">No booking found</p>
    )
  }

  const allBookings = Bookings.data

  let bookings = allBookings ?? []
  if (limit) {
    bookings = bookings.slice(0, limit)
  }


  return (
    <div className="">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {
          bookings.map((booking: Booking) => (
            <MyBookingCard key={booking.id} booking={booking} />
          ))
        }
      </div>
    </div>
  );
};

export default MyBookingLists;