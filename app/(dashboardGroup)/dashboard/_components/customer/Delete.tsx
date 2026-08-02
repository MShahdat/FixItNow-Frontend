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

export function DeleteDialog() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button size="sm" variant="destructive">Delete</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogDescription>
            Do you want to delete booking?
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button size={"xs"} variant="outline">No</Button>
            </DialogClose>
            <Button size={"xs"} type="submit">Ok</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
