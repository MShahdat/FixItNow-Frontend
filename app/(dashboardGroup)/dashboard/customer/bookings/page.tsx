
import SearchBar from "@/components/shared/SearchBar";
import { CardShow } from "@/components/shared/CardShow";
import { Paginations } from "@/components/shared/Pagination";
import MyBookingLists from "../../_components/customer/MyBookingLists";
import { getMyBookings } from "../../_action/customer/myBookings";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";


const BookingPage = async ({
  searchParams,
}:
  { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

  const search = await searchParams

  const bookings = await getMyBookings(search)
  // console.log('...............', bookings)

  if (!bookings.success || !bookings.data?.length) {
    return (
      <p className="py-12 text-center text-red-700">You did not yet booking service</p>
    )
  }


  return (
    <div className='max-w-7xl mx-auto px-2 py-4'>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-xl md:text-2xl whitespace-nowrap font-semibold'>My Bookings({bookings.meta.total})</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-center gap-2">
              <p className="whitespace-nowrap">Per Page:</p>
              <CardShow />
            </div>
            <SearchBar />
            <Link href={'/services'}>
              <Button>
                <Plus />
                create booking
              </Button>
            </Link>
          </div>
        </div>

        <MyBookingLists searchParams={search} />
      </div>
    </div>
  );
};

export default BookingPage;