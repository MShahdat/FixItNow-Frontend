

import SearchBar from "@/components/shared/SearchBar";
import { CardShow } from "@/components/shared/CardShow";
import BookingLists from "../../_components/technicians/bookingLists";
import { Paginations } from "@/components/shared/Pagination";
import { getBookingByTechnician } from "../../_action/getBookingByTechnician";


const BookingPage = async ({
  searchParams,
}: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

  const search = await searchParams
  // console.log('search ', search)

  const bookings = await getBookingByTechnician(search)

  if (!bookings.success || !bookings.data?.length) {
    return (
      <p className="py-12 text-center text-red-700">No booking found</p>
    )
  }

  return (
    <div className='max-w-7xl mx-auto px-2 py-4'>
      <div className='flxe flex-col space-y-6'>
        <div className='flex flex-col sm:flex-row justify-between space-y-2'>
          <p className='text-xl md:text-2xl whitespace-nowrap font-semibold'>Manage Bookings</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <p className="whitespace-nowrap">Per Page: </p>
              <CardShow />
            </div>
            <SearchBar />
          </div>
        </div>

        <BookingLists searchParams={search} />

        <Paginations meta={bookings.meta} />
      </div>
    </div>
  );
};

export default BookingPage;