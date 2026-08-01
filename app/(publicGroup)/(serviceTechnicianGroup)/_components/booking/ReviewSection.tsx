import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

const reviewss = [
  {
    profile: '',
    name: 'shahdat',
    date: '12 May 2026',
    rating: 4,
    review: 'this service was excelent',
  },
  {
    profile: '',
    name: 'shahdat',
    date: '12 May 2026',
    rating: 4,
    review: 'this service was excelent',
  },
  {
    profile: '',
    name: 'shahdat',
    date: '12 May 2026',
    rating: 4,
    review: 'this service was excelent',
  },
  {
    profile: '',
    name: 'shahdat',
    date: '12 May 2026',
    rating: 4,
    review: 'this service was excelent',
  },
];

const ReviewSection = ({ reviews }: { reviews: any }) => {
  const reviewList = Array.isArray(reviews) ? reviews : [];
  const totalReviews = reviewList.length;

  return (
    <div className="space-y-4 rounded-3xl border border-border bg-white/80 p-6 shadow-sm dark:bg-slate-950/80 dark:border-slate-800">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Reviews</h2>
          <p className="text-sm text-muted-foreground">{totalReviews} review{totalReviews === 1 ? '' : 's'}</p>
        </div>
        <Badge
          variant="link"
          className="cursor-pointer px-0 text-primary underline-offset-4"
        >
          See all
        </Badge>
      </div>

      <div className="space-y-4">
        {reviewList.map((review: any) => {
          const reviewerName = review.customer?.firstName
            ? `${review.customer.firstName} ${review.customer.lastName ?? ''}`.trim()
            : review.customerId || 'Customer';
          const reviewDate = review.createdAt
            ? new Date(review.createdAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
            : '';
          const rating = Number(review.rating) || 0;
          const comment = review.comment || review.text || 'No review comment available.';

          return (
            <div key={review.id} className="flex items-start gap-3">
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarFallback className="text-xs uppercase bg-primary/10 text-primary">
                  {reviewerName
                    .split(' ')
                    .map((word: string) => word[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-semibold">{reviewerName}</span>
                  {reviewDate ? <span className="text-muted-foreground">· {reviewDate}</span> : null}
                </div>
                <div className="flex items-center gap-1 text-sm">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {comment}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewSection;