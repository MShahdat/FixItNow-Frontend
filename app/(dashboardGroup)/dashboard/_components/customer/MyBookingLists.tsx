
import { getMyBookings } from "../../_action/customer/myBookings";
import { MyBookingTable } from "./MyBookingTable";

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};


const MyBookingLists = async ({ searchParams }: Props) => {

  const bookings = await getMyBookings(searchParams)
  console.log('customer bookings ', bookings)


  if (!bookings.success || !bookings.data?.length) {
    return (
      <p className="py-12 text-center text-red-700">No booking found</p>
    )
  }


  return (
    <div className="">
      <MyBookingTable bookings={bookings?.data} />
    </div>
  );
};

export default MyBookingLists;