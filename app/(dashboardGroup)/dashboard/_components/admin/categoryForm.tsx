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
import { Categories } from "@/lib/interface"
import { Edit, Plus } from "lucide-react"
import { useActionState, useEffect, useState } from "react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { updateCategory } from "../../_action/admin/updateCategoy"
import { createCategory } from "../../_action/admin/createCategoy"


type Props = {
  mode: "edit" | "create"
  category?: Categories
}

export function CategoryForm({ mode, category }: Props) {
  const [open, setOpen] = useState(false)

  const STATUS = ["ACTIVE", "IN_ACTIVE"]

  const [type, setType] = useState<string>(category?.status ?? "ACTIVE")
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const action = mode === "edit"
    ? updateCategory.bind(null, category?.id as string)
    : createCategory

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
        {
          mode === "create" ?
            <Button>
              <Plus />
              Create Category
            </Button> : <Button>
              <Edit />
            </Button>
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form action={formAction} onSubmit={() => setHasSubmitted(true)}>
          <DialogHeader>
            <DialogTitle>Category {mode === "edit" ? "Update" : "Create"}</DialogTitle>
            <DialogDescription>
              {/* Admin can update user status like 'BLOCKED' or 'ACCEPTE' */}
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="mt-6">

            <Field>
              <Field>
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={category?.name ?? ""}
                  required
                />
              </Field>

              <Field>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  defaultValue={category?.description ?? ""}
                  name="description"
                  required
                />
              </Field>

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
              {pending ? 'Saving' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}