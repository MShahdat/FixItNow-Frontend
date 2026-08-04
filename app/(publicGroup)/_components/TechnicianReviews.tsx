// app/(publicGroup)/_components/TechnicianReviews.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";
import { ITechnicianReview } from "@/lib/interface";
import { getRatingSummary } from "@/lib/technicianRating";

const PAGE_SIZE = 3;

export function TechnicianReviews({
  reviews,
}: {
  reviews: ITechnicianReview[];
}) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const { average, count, breakdown } = getRatingSummary(reviews);
  const visibleReviews = reviews.slice(0, visibleCount);

  if (count === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        No reviews yet.
      </p>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="h-fit lg:col-span-1">
        <CardContent className="space-y-4 p-6">
          <div>
            <p className="text-4xl font-semibold">{average.toFixed(1)}</p>
            <p className="text-sm text-muted-foreground">{count} reviews</p>
          </div>

          <div className="space-y-2">
            {([5, 4, 3, 2, 1] as const).map((star) => {
              const starCount = breakdown[star];
              const percent = count ? (starCount / count) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2 text-sm">
                  <span className="w-3 text-muted-foreground">{star}</span>
                  <Progress value={percent} className="h-2" />
                  <span className="w-6 text-right text-xs text-muted-foreground">
                    {starCount}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4 lg:col-span-2">
        {visibleReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="space-y-2 p-5">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${i < Math.round(review.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground/30"
                      }`}
                  />
                ))}
              </div>

              <p className="text-sm text-muted-foreground">
                {review.comment}
              </p>
            </CardContent>
          </Card>
        ))}

        {visibleCount < reviews.length && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
          >
            Load more reviews
          </Button>
        )}
      </div>
    </div>
  );
}