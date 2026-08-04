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
import { IUser } from "@/lib/interface"
import { Edit } from "lucide-react"
import { useActionState, useEffect, useState } from "react"
import { toast } from "sonner"
import { userStatusUpdate } from "../../_action/admin/statusUpdate"

export function StatusUpdateForm({ user }: { user: IUser }) {
  const [open, setOpen] = useState(false)

  const STATUS = ["ACTIVE", "BLOCKED"]

  const [type, setType] = useState<string>(user.status)
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const action = userStatusUpdate.bind(null, user?.id)
  const [state, formAction, pending] = useActionState(action, null)


  useEffect(() => {
    if (!hasSubmitted || !state) return

    if (state.success && state.data) {
      toast.success(state.message)
      setOpen(false)
    } else {
      setOpen(false)
      toast.error(state.message || 'Updated failed')
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
            <DialogTitle>Update User Status</DialogTitle>
            <DialogDescription>
              Admin can update user status like 'BLOCKED' or 'ACCEPTE'
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="mt-6">
            <Field>
              <Label>Status</Label>
              <Select name="status" value={type} onValueChange={setType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
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