'use client'


import { CancelDialog } from "./Cancel"
import { ViewPaymentStatus } from "./ViewPaymentStatus"
import { ReviewForm } from "./ReviewForm"
import { ViewReview } from "./ViewReview"
import { Button } from "@/components/ui/button"
import { payment } from "../../_action/customer/payment"
import { toast } from "sonner"
import { redirect } from "next/navigation"
import { Booking } from "@/lib/interface"


export function ActionButton({ booking }: { booking: Booking }) {

  const handlePay = async () => {
    console.log('booking id from button ', booking.id)
    const pay = await payment(bookingId as string)
    console.log('pay======', pay)

    if (pay.success) {
      const url = pay.data?.paymentUrl
      redirect(url)
    }
    else {
      toast.error(pay.message ?? "payment failed")
    }
  }

  const status = booking?.status
  const bookingId = booking.id

  switch (status) {
    case "REQUESTED":
    case "DECLINED":
      return (
        <CancelDialog bookingId={bookingId} />
      )
    case "IN_PROGRESS":
      return (
        <ViewPaymentStatus bookingId={bookingId} />
      )
    case "ACCEPTED":
      return (
        <Button
          onClick={() => {
            handlePay()
          }}
          size="sm" variant="default">Payment</Button>
        // <PaymentDialog />
      )
    case "COMPLETED":
      return booking.review ?
        <ViewReview booking={booking} /> : <ReviewForm booking={booking} mode="create" />
    default:
      return null
  }
}