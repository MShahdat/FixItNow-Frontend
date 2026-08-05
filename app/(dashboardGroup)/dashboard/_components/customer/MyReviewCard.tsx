'use client'


import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { Star, Clock, DollarSign, Calendar, Pencil, Trash2, Edit2, Edit } from 'lucide-react';
import { ReviewForm } from './ReviewForm';
import { DeleteDialog } from './Delete';
import { Booking, IReviews } from '@/lib/interface';


interface MyReviewCardProps {
  review: IReviews;
  bookings: Booking[],
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const image =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkuKgfrrptyY5G4fIL2_CUi5yZ_cAcOJMU5tvyrGAxPGshzQAbxzK4bRzh&s=10';

const MyReviewCard = ({ review, bookings }: MyReviewCardProps) => {

  const rating = Math.round(Number(review.rating));
  const technicianName = `${review.technician.user.firstName} ${review.technician.user.lastName}`;

  const booking = bookings.find((book) => book.id === review.bookingId)

  return (
    <Card className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden min-h[200px] max-h[340px] flex flex-col relative">

      <div className="absolute top-3 right-3 flex items-center gap-1 z-10">

        {
          booking &&
          <ReviewForm booking={booking} mode='edit' />
        }

        {
          booking &&
          <DeleteDialog reviewId={booking.review.id} />
        }

      </div>

      <CardHeader className="p-4 flex-1 min-h-0 flex flex-col overflow-hidden">
        <div className="flex items-start gap-3 pr-16">
          <div className="w-16 h-16 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden">
            <img
              src={review.service.cover || image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base text-gray-900 truncate">
              {review.service.title}
            </h3>

            <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-green-50 text-green-700 text-xs font-medium">
              {review.service.type}
            </span>

            <div className="flex items-center gap-1 flex-shrink-0 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'
                    }`}
                />
              ))}
              <span className="ml-1 text-sm font-medium text-gray-700">
                {Number(review.rating).toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-3 text-sm text-gray-600 leading-relaxed overflow-y-auto pr-1 flex-1 min-h-0">
          {review.comment}
        </p>
      </CardHeader>

      <div className="border-t border-gray-100 px-4 py-2 grid grid-cols-4 gap-2 flex-shrink-0">
        <div className="flex flex-col items-center text-center gap-1">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
            {review.technician.user.firstName.charAt(0)}
          </div>
          <span className="text-[11px] text-gray-400">Technician</span>
          <span className="text-xs font-medium text-gray-800 truncate w-full">
            {technicianName}
          </span>
        </div>

        <div className="flex flex-col items-center text-center gap-1">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-[11px] text-gray-400">Duration</span>
          <span className="text-xs font-medium text-gray-800">{review.service.duration}</span>
        </div>

        <div className="flex flex-col items-center text-center gap-1">
          <DollarSign className="w-4 h-4 text-gray-400" />
          <span className="text-[11px] text-gray-400">Price</span>
          <span className="text-xs font-medium text-gray-800">${review.service.price}</span>
        </div>

        <div className="flex flex-col items-center text-center gap-1">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-[11px] text-gray-400">Reviewed on</span>
          <span className="text-xs font-medium text-gray-800">
            {formatDate(review.createdAt)}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default MyReviewCard;