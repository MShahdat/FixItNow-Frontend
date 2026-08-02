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
import { Star } from "lucide-react"
import { useActionState, useEffect, useState } from "react"
import { createReview } from "../../_action/customer/createReview"
import { toast } from "sonner"

export function ReviewForm({ bookingId }: { bookingId: string }) {


  const action = createReview.bind(null, bookingId)
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
        <Button size="sm" variant="paid">Review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Create review</DialogTitle>

            <DialogDescription>
              Create your service review!
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
                min={0}
                required
              />
            </Field>
            <Field>
              <Label htmlFor="description">Comment</Label>
              <Textarea
                rows={2}
                placeholder="Write comment...."
                name="comment"
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
