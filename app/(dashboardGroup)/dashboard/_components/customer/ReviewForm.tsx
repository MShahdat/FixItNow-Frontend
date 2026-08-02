import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Star } from "lucide-react"
import { useActionState, useEffect, useState } from "react"
import { createReview } from "../../_action/customer/createReview"
import { toast } from "sonner"
import { Booking } from "./MyBookingTable"
import { Review } from "./MyReviewCard"
import { updateReview } from "../../_action/customer/updateReview"


type Props = {
  booking: Booking,
  mode?: "edit" | "create"
}

export function ReviewForm({ booking, mode }: Props) {

  const bookingId = booking?.id

  // const action = createReview.bind(null, bookingId)
  const action = mode === 'edit' && booking.review.id ?
    updateReview.bind(null, booking.review.id) : createReview.bind(null, bookingId)

  const [state, formAction, pending] = useActionState(action, null)
  const [open, setOpen] = useState(false)


  useEffect(() => {
    if (!state) return
    if (state.success) {
      toast.success(state.message)
    } else {
      toast.error(state.message || 'create review failed')
    }
    setOpen(false)
  }, [state])


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {
          mode === 'create' ?
            <Button size="sm" variant="paid">
              Review
            </Button> : <button
              aria-label="Edit review"
              className="w-8 h-8 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-200 transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>
              {mode === 'edit' ? 'Edit Review' : ' Create review'}
            </DialogTitle>

            <DialogDescription>
              {
                mode === 'create' ? 'Create your service review!' : 'Update your review! Write honest opinion'
              }
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="mt-6 pb-4">
            <Field>
              <Label htmlFor="rating">Rating
                <span><Star className="size-3.5" /></span>
              </Label>
              <Input
                type="number"
                name="rating"
                max={5}
                min={1}
                defaultValue={booking.review?.rating ?? ''}
                required
              />
            </Field>
            <Field>
              <Label htmlFor="description">Comment</Label>
              <Textarea
                rows={2}
                placeholder="Write comment...."
                name="comment"
                defaultValue={booking.review?.comment ?? ''}
                required
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {pending ? "Creating" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
