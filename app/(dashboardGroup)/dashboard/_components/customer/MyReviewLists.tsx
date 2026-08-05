import React from 'react';
import { getReviews } from '../../_action/customer/getReview';
import MyReviewCard from './MyReviewCard';
import { getMyBookings } from '../../_action/customer/myBookings';
import { IReviews, Review } from '@/lib/interface';



type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};


const MyReviewLists = async ({ searchParams }: Props) => {

  const reviews = await getReviews()
  const bookings = await getMyBookings(searchParams)


  if (!reviews.success || !bookings.data?.length) {
    return
  }


  return (
    <div className='max-w-7xl mx-auto px-2 pb-20'>
      <div className='grid grid-cols-1 lg:grid-cols-2 space-y-1 gap-4'>
        {
          reviews.data.map((item: IReviews) => (
            <MyReviewCard key={item.id} review={item} bookings={bookings.data} />
          ))
        }
      </div>
    </div>
  );
};

export default MyReviewLists;