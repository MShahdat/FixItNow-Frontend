import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cancelBooking } from "../../_action/customer/cancelBooking"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

export function CancelDialog({ bookingId }: { bookingId: string }) {

  const action = cancelBooking.bind(null, bookingId)
  const [state, formAction, pending] = useActionState(action, null)

  useEffect(() => {
    if (!state) return
    if (state.success && state.data) {
      toast.success(state.message)
    } else {
      toast.error(state.message || 'register failed')
    }
  }, [state])



  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" size="sm" variant="destructive">Cancel</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form action={formAction} className="space-y-4">
          <DialogDescription>
            Do you want to cancel booking?
          </DialogDescription>
          <FieldGroup>
            <Field>
              <Label htmlFor="description">Cancel Reason <span className="text-red-500">(Optional)</span></Label>
              <Textarea
                rows={2}
                placeholder="Reason...."
                name="cancelReason"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button size={"xs"} variant="outline">No</Button>
            </DialogClose>
            <Button size={"xs"} type="submit">
              Ok
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
