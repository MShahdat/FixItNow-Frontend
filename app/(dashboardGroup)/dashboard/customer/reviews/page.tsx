
import { getMyBookings } from "../../_action/customer/myBookings";
import MyReviewLists from "../../_components/customer/MyReviewLists";


const ReviewPage = async ({
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
      <div className='flxe flex-col space-y-6'>
        <div className='flex flex-col sm:flex-row justify-between space-y-2'>
          <p className='text-xl md:text-2xl whitespace-nowrap font-semibold'>Manage Reviews</p>
        </div>

        <MyReviewLists searchParams={search} />

      </div>
    </div>
  );
};

export default ReviewPage;