
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

  return (
    <div className="">
      <MyBookingTable bookings={bookings?.data} />
    </div>
  );
};

export default MyBookingLists;