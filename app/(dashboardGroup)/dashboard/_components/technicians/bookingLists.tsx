import { bookingStatusUpdate } from "../../_action/bookingStatusUpdate";
import { getBookingByTechnician } from "../../_action/getBookingByTechnician";
import { BookingTable } from "./bookingTable";

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};


const BookingLists = async ({ searchParams }: Props) => {

  const bookings = await getBookingByTechnician(searchParams)
  // const up = await bookingStatusUpdate()

  console.log('bookings ', bookings)

  return (
    <div className="">
      <BookingTable bookings={bookings.data} />
    </div>
  );
};

export default BookingLists;