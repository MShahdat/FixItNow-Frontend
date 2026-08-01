"use client"

import { act, useActionState, useEffect, useState } from "react"
import { Plus, X, ImagePlus, PencilIcon, PlusIcon, Edit } from "lucide-react"

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
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Categories, MY_SERVICE } from "@/lib/interface"
import { createService } from "../../_action/createService"
import { editService } from "../../_action/editService"
import { toast } from "sonner"

const SERVICE_TYPES = ["one-time", "recurring", "package"]
const DURATIONS = ["30 min", "1 hour", "2 hour", "6 hout", "half-day", "full-day", "2 days", "1 week", "1 week+"]

type Props = {
  mode: "create" | "edit"
  service?: MY_SERVICE
  categories?: Categories[]
}


export function DialogService({ mode, service, categories }: Props) {

  const action = mode === "edit" && service ?
    editService.bind(null, service.id) : createService
  const [state, formAction, pending] = useActionState(action, null)

  useEffect(() => {
    if (!state) return
    if (state.success) {
      toast.success(state.message)
    } else {
      // console.log('login failed')
      toast.error(state.message || 'register failed')
    }
    setOpen(!open)
  }, [state])


  // console.log('categories from dialog box', categories)

  const [open, setOpen] = useState(false)

  const [coverPreview, setCoverPreview] = useState<string | undefined>(service?.cover)
  const [categoryId, setCategoryId] = useState(service?.categoryId ?? "")
  const [type, setType] = useState(service?.type ?? "")
  const [duration, setDuration] = useState(service?.duration ?? "")

  const [location, setLocation] = useState<string[]>(service?.location ?? [])
  const [locationInput, setLocationInput] = useState("")

  const [availableAt, setAvailableAt] = useState<string[]>(service?.availableAt ?? [])
  const [availableAtInput, setAvailableAtInput] = useState("")

  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setCoverPreview(URL.createObjectURL(file))
  }

  function addLocation() {
    const trimmed = locationInput.trim()
    if (!trimmed || location.includes(trimmed)) {
      setLocationInput("")
      return
    }
    setLocation([...location, trimmed])
    setLocationInput("")
  }

  function addAvailableAt() {
    const trimmed = availableAtInput.trim()
    if (!trimmed || availableAt.includes(trimmed)) {
      setAvailableAtInput("")
      return
    }
    setAvailableAt([...availableAt, trimmed])
    setAvailableAtInput("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "edit" ? (
          <Button variant="secondary" size="sm">
            <Edit />
          </Button>
        ) : (
          <Button>
            <PlusIcon data-icon="inline-start" />
            Create Post
          </Button>
        )}

      </DialogTrigger>

      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create a new service" : "Edit service"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Fill in the details below to list a new service."
              : "Update the details of your service."}
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <FieldGroup className="gap-4 py-4">
            <Field>
              <Label htmlFor="cover">Cover image</Label>
              <label
                htmlFor="cover"
                className="flex h-36 cursor-pointer items-center justify-center rounded-md border border-dashed text-muted-foreground hover:bg-accent/50 overflow-hidden"
              >
                {coverPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={coverPreview} alt="Cover preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-1 text-sm">
                    <ImagePlus className="size-5" />
                    Click to upload cover image
                  </div>
                )}
              </label>
              <Input name="cover" id="cover" type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
            </Field>
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={service?.title ?? ""}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={4}
                defaultValue={service?.description ?? ""}
                name="description"
                required
              />
            </Field>

            {/* Category + Price */}
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label>Category</Label>
                <Select name="categoryId" value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  type="number"
                  name="price"
                  defaultValue={service?.price ?? ''}
                  required
                />
              </Field>
            </div>


            <Field>
              <Label htmlFor="location">Locations</Label>
              <div className="flex gap-2">
                <Input
                  id="location"
                  placeholder="e.g. Dhaka, Chittagong"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addLocation()
                    }
                  }}
                />
                <Button type="button" variant="secondary" onClick={addLocation}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {location.map((loc) => (
                  <Badge key={loc} variant="secondary" className="gap-1">
                    {loc}
                    <button
                      type="button"
                      onClick={() => setLocation(location.filter((l) => l !== loc))}
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </Field>

            <Field>
              <Label htmlFor="availableAt">Available times</Label>
              <div className="flex gap-2">
                <Input
                  id="availableAt"
                  placeholder="e.g. Mon 9AM-5PM"
                  value={availableAtInput}
                  onChange={(e) => setAvailableAtInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addAvailableAt()
                    }
                  }}
                />
                <Button type="button" variant="secondary" onClick={addAvailableAt}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {availableAt.map((slot) => (
                  <Badge key={slot} variant="secondary" className="gap-1">
                    {slot}
                    <button
                      type="button"
                      onClick={() => setAvailableAt(availableAt.filter((s) => s !== slot))}
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </Field>

            <input type="hidden" name="location" value={JSON.stringify(location)} />
            <input type="hidden" name="availableAt" value={JSON.stringify(availableAt)} />
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label>Duration</Label>
                <Select name="duration" value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {DURATIONS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <Label>Type</Label>
                <Select name="type" value={type} onValueChange={setType}>
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
            </div>


          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving" : mode === 'edit' ? "Save Change" : 'Create Post'}
            </Button>
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  )
}