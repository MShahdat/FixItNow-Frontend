'use client'

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { BookingTech } from "@/lib/interface"
import { Edit } from "lucide-react"
import { useActionState, useEffect, useState } from "react"
import { bookingStatusUpdate } from "../../_action/bookingStatusUpdate"
import { toast } from "sonner"
import { useRouter } from "next/dist/client/components/navigation"

export function StatusUpdateForm({ booking }: { booking: BookingTech }) {
  const [open, setOpen] = useState(false)

  const SERVICE_TYPES = ["ACCEPTED", "REQUESTED", "DECLINED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]
  const [type, setType] = useState(booking?.status ?? "")
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const action = bookingStatusUpdate.bind(null, booking?.id)
  const [state, formAction, pending] = useActionState(action, null)

  const router = useRouter()

  useEffect(() => {
    if (!hasSubmitted || !state) return

    if (state.success && state.data) {
      toast.success(state.message)
      setOpen(false)
    } else {
      setOpen(false)
      toast.error(state.message || 'register failed')
    }

    setHasSubmitted(false)
  }, [hasSubmitted, state])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant="default">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form action={formAction} onSubmit={() => setHasSubmitted(true)}>
          <DialogHeader>
            <DialogTitle>Update Status</DialogTitle>
            <DialogDescription>
              Only 'Accept' or 'Declined' on new incoming bookings. And 'Completed' for jobs with status 'In-Progress'.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label>Status</Label>
              <Select name="status" value={type} onValueChange={setType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={pending}>
              {pending ? 'Changing' : 'Change'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}