// lib/technician-rating.ts
import { ITechnicianReview } from "@/lib/interface";

export function getRatingSummary(reviews: ITechnicianReview[]) {
  const breakdown: Record<1 | 2 | 3 | 4 | 5, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  let total = 0;

  for (const review of reviews) {
    const rating = Math.round(review.rating);
    if (rating >= 1 && rating <= 5) {
      breakdown[rating as 1 | 2 | 3 | 4 | 5] += 1;
      total += rating;
    }
  }

  const count = reviews.length;
  const average = count > 0 ? total / count : 0;

  return { average, count, breakdown };
}