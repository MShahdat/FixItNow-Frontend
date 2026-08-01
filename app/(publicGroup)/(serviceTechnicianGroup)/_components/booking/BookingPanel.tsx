"use client"

import * as React from "react"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ChevronDownIcon, ShieldCheck } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns"
import { createBookingAction } from "../../_action/createBookingAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const BookingPanel = ({
  serviceId,
  bookings,
  price,
  availableAt,
}: {
  serviceId: string
  bookings: any
  price?: string
  availableAt?: string[]
}) => {

  const bookingCount = Array.isArray(bookings) ? bookings.length : 0
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)


  const action = createBookingAction.bind(null, serviceId)
  const [state, formAction, pending] = React.useActionState(action, null)

  const router = useRouter()

  React.useEffect(() => {
    if (!state) return
    if (state.success && state.data) {
      toast.success(state.message)
      router.push('/dashboard/customer/bookings')
    } else {
      toast.error(state.message || 'booking failed')
    }
  }, [state])

  return (
    <form action={formAction}>
      <input type="hidden" name="date" value={date ? date.toISOString() : ""} />
      <Card className="rounded-3xl border border-border bg-white/80 shadow-sm dark:bg-slate-950/80 dark:border-slate-800">
        <CardHeader className="flex flex-row items-baseline justify-between gap-2 pb-2">
          <div>
            <p className="text-sm text-muted-foreground">Starting price</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-semibold text-foreground">{price ?? '0'}</span>
              <span className="text-sm text-muted-foreground">tk</span>
            </div>
          </div>
          <div className="rounded-3xl bg-muted px-3 py-2 text-sm font-medium">
            {bookingCount} booking{bookingCount === 1 ? '' : 's'}
          </div>
        </CardHeader>

        <Separator />

        <CardContent >

          <FieldGroup>
            <Field>
              <Label htmlFor="description">Note <span className="text-red-600">(Optional)</span></Label>
              <Textarea
                rows={4}
                placeholder="Write note...."
                name="note"
              />
            </Field>
            <Field>
              <Label htmlFor="description">Address</Label>
              <Textarea
                rows={2}
                placeholder="Address details...."
                name="address"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="date-picker-optional">Date</FieldLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className="">
                  <Button
                    variant="outline"
                    id="date-picker-optional"
                    className="w-32 justify-between font-normal"
                  >
                    {date ? format(date, "PPP") : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    defaultMonth={date}
                    onSelect={(date) => {
                      setDate(date)
                      setOpen(false)
                    }}
                  />
                </PopoverContent>
              </Popover>
            </Field>


          </FieldGroup>

        </CardContent>
        <CardFooter className="flex flex-col gap-3 items-stretch pt-0">
          <Button type="submit" size="lg" className="w-full">
            {pending ? 'Booking' : 'Book Now'}
          </Button>
          <p className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-red-600" />
            No charge until accepted by service provider
          </p>
        </CardFooter>
      </Card>
    </form>
  );
};

export default BookingPanel;