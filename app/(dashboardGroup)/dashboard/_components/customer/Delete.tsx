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
import { deleteReview } from "../../_action/customer/delteReview"
import { useActionState, useEffect, useState } from "react"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function DeleteDialog({ reviewId }: { reviewId: string }) {

  const action = deleteReview.bind(null, reviewId)
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
        <button
          aria-label="Delete review"
          className="w-8 h-8 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-red-500 hover:border-red-200 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form action={formAction}>
          <DialogDescription>
            Do you want to delete review?
          </DialogDescription>
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button size={"xs"} variant="outline">No</Button>
            </DialogClose>
            <Button size={"xs"} type="submit">Ok</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
