'use client'


import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useState } from "react";
import { paymentStatus } from "../../_action/customer/paymentStatus";
import { toast } from "sonner";
import { IBookingPaymentDetails } from "@/lib/interface";
import { CalendarDays, CheckCircle2, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";


export function ViewPaymentStatus(bookingId: { bookingId: string }) {

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IBookingPaymentDetails | null>(null)

  const handleOpenChange = async (isOpen: boolean) => {
    setOpen(isOpen)

    if (isOpen && !data) {
      setLoading(true)
      const res = await paymentStatus(bookingId)
      if (res.success) {
        setData(res.data)
      }
      else {
        toast.error(res.message ?? 'failed to fetch payment status')
      }
      setLoading(false)
    }
  }

  function CopyRow({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) {
    const handleCopy = async () => {
      await navigator.clipboard.writeText(value);
      toast.success(`${label} copied`);
    };

    return (
      <div className="flex items-center justify-between rounded-xl border p-4">
        <div className="overflow-hidden">
          <p className="text-sm text-muted-foreground">
            {label}
          </p>

          <p className="truncate font-medium">
            {value}
          </p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant="outline">View Payment</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl overflow-hidden rounded-2xl p-0">
        <DialogHeader className="hidden">
          <DialogTitle>Payment Details</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex h-80 items-center justify-center">
            Loading...
          </div>
        ) : (
          data && (
            <>
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold">
                        Payment Successful
                      </h2>

                      <p className="text-sm text-emerald-100">
                        Your payment has been received successfully.
                      </p>
                    </div>
                  </div>

                  <Badge className="rounded-full bg-white px-4 py-1 text-emerald-700 hover:bg-white">
                    {data.paymentStatus}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4 px-6 pb-6">
                {/* Top Row */}
                <div className="grid grid-cols-2 rounded-xl border">

                  <div className="p-5">
                    <p className="text-sm text-muted-foreground">
                      Amount Paid
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-emerald-600">
                      ৳{Number(data.amount).toLocaleString()}
                    </h3>
                  </div>

                  <div className="p-5">
                    <p className="text-sm text-muted-foreground">
                      Booking Status
                    </p>

                    <Badge className="mt-2 rounded-full">
                      {data.bookingStatus}
                    </Badge>
                  </div>
                </div>

                {/* Schedule */}
                <div className="rounded-xl border p-5">
                  <div className="flex gap-3">
                    <CalendarDays className="mt-1 h-5 w-5 text-emerald-600" />

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Paid At
                      </p>

                      <p className="font-semibold">
                        {new Date(data.paidAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* IDs */}

                <div className="space-y-4">
                  <CopyRow
                    label="Transaction ID"
                    value={data.transactionId}
                  />
                </div>
              </div>
            </>
          )
        )}
      </DialogContent>
    </Dialog>
  )
}
