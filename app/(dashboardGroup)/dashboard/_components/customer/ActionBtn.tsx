'use client'


import { CancelDialog } from "./Cancel"
import { ViewDialog } from "./View"
import { PaymentDialog } from "./PaymentForm"
import { ReviewForm } from "./ReviewForm"
import { ViewReview } from "./ViewReview"
import { Booking } from "./MyBookingTable"





export function ActionButton({ booking }: { booking: Booking }) {

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
        <ViewDialog />
      )
    case "ACCEPTED":
      return (
        <PaymentDialog />
      )
    case "COMPLETED":
      return booking.review ?
        <ViewReview booking={booking} /> : <ReviewForm booking={booking} mode="create" />
    default:
      return null
  }
}