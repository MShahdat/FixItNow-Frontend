import React from 'react';
import { getReviews } from '../../_action/customer/getReview';
import MyReviewCard, { Review } from './MyReviewCard';
import { getMyBookings } from '../../_action/customer/myBookings';



type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};


const MyReviewLists = async ({ searchParams }: Props) => {

  const reviews = await getReviews()
  const bookings = await getMyBookings(searchParams)


  if (!reviews.success || !reviews.data?.length) {
    return (
      <p className="py-12 text-center text-red-700">No reviews found</p>
    )
  }



  return (
    <div className='max-w-7xl mx-auto px-2 pb-20'>
      <div className='grid grid-cols-1 lg:grid-cols-2 space-y-1 gap-4'>
        {
          reviews.data.map((item: Review) => (
            <MyReviewCard key={item.id} review={item} bookings={bookings.data} />
          ))
        }
      </div>
    </div>
  );
};

export default MyReviewLists;