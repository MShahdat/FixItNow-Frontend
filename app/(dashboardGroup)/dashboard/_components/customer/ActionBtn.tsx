'use client'


import { CancelDialog } from "./Cancel"
import { ViewDialog } from "./View"
import { PaymentDialog } from "./PaymentForm"
import { ReviewForm } from "./ReviewForm"



type Props = {
  status: string,
  bookingId: string
}


export function ActionButton({ status, bookingId }: Props) {
  switch (status) {
    case "REQUESTED":
      return (
        <CancelDialog bookingId={bookingId} />
      )
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
      return (
        <ReviewForm bookingId={bookingId} />
      )
    default:
      return null
  }
}