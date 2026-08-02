import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Star, User, Wrench, CalendarClock } from "lucide-react"
import { Booking } from "./MyBookingTable"



function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.floor(rating)
          const half = !filled && i < rating
          return (
            <Star
              key={i}
              className={`h-4 w-4 ${filled || half
                ? "fill-yellow-400 text-yellow-400"
                : "fill-muted text-muted-foreground/30"
                }`}
            />
          )
        })}
      </div>
      <span className="text-sm font-medium text-muted-foreground">
        {rating.toFixed(1)}
      </span>
    </div>
  )
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="space-y-0.5">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="text-sm font-medium capitalize leading-snug">{value}</p>
      </div>
    </div>
  )
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export function ViewReview({ booking }: { booking: Booking }) {

  const { review, serviceTitle, technicianName } = booking

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="accepted">
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Review Details</DialogTitle>
          <DialogDescription>
            Your submitted review and related service information
          </DialogDescription>
        </DialogHeader>

        <div className="no-scrollbar max-h-[60vh] space-y-5 overflow-y-auto py-1">
          {/* Rating + Comment */}
          <div className="space-y-2 rounded-lg border bg-muted/30 p-4">
            <StarRating rating={review.rating} />
            <p className="text-sm leading-relaxed text-foreground/90">
              "{review.comment}"
            </p>
          </div>

          <Separator />

          {/* Details */}
          <div className="grid gap-4">
            <InfoRow icon={Wrench} label="Service" value={serviceTitle} />
            <InfoRow icon={User} label="Technician" value={technicianName} />
          </div>

          <Separator />

          {/* Timestamps */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CalendarClock className="h-3.5 w-3.5" />
              <span>Created {formatDate(review.createdAt)}</span>
            </div>
            <Badge variant="outline" className="font-normal">
              Updated {formatDate(review.updatedAt)}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}