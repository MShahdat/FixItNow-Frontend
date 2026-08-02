


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ActionButton } from "./ActionBtn"



export interface Review {
  id: string
  rating: number
  comment: string
  createdAt: string
  updatedAt: string
}

export interface Booking {
  id: string
  serviceTitle: string
  technicianName: string
  type: "one-time" | "recurring"
  duration: string
  scheduledDate: string
  status: "REQUESTED" | "ACCEPTED" | "DECLINED" | "IN_PROGRESS" | "CANCELLED" | "COMPLETED"
  totalAmount: number
  review: Review
}

type Props = {
  bookings: Booking[]
}

function getStatusVariant(status: string) {
  switch (status) {
    case "ACCEPTED":
      return "accepted"
    case "REQUESTED":
      return "requested"
    case 'DECLINED':
      return "declined"
    case "CANCELLED":
      return "cancelled"
    case "COMPLETED":
      return "completed"
    case "IN_PROGRESS":
      return "inProgress"
    default:
      return "secondary"
  }
}

function formatStatus(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase()
}

export function MyBookingTable({ bookings }: Props) {

  return (
    <Table>
      <TableHeader>
        <TableRow className="text-center">
          <TableHead>Service Title</TableHead>
          <TableHead>Technician Name</TableHead>
          <TableHead>Total Amount</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Servicing Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
              No bookings found.
            </TableCell>
          </TableRow>
        ) : (
          bookings?.map((booking: Booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking?.serviceTitle}</TableCell>
              <TableCell> {booking.technicianName} </TableCell>
              <TableCell>{booking.totalAmount}</TableCell>
              <TableCell>{booking.type}</TableCell>
              <TableCell>{booking.duration}</TableCell>
              <TableCell>
                {new Date(booking.scheduledDate).toLocaleDateString("en-US", {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(booking.status)}>
                  {formatStatus(booking.status)}
                </Badge>
              </TableCell>
              <TableCell >
                <ActionButton booking={booking} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}