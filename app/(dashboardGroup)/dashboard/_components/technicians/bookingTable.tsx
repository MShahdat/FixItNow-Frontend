
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BookingTech } from "@/lib/interface"
import { StatusUpdateForm } from "./statusUpdateForm"


interface BookingTableProps {
  bookings: BookingTech[]
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

export function BookingTable({ bookings }: BookingTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="text-center">
          <TableHead>Customer</TableHead>
          <TableHead>Service Title</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="">Actions</TableHead>
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
          bookings?.map((booking: BookingTech) => (
            <TableRow key={booking.id} className="">
              <TableCell className="font-medium">
                {booking.customer.firstName} {booking.customer.lastName}
              </TableCell>
              <TableCell>{booking.service?.title}</TableCell>
              <TableCell>{booking.totalAmount}</TableCell>
              <TableCell>{booking.service?.duration}</TableCell>
              <TableCell className="capitalize">{booking.service?.type}</TableCell>
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
              <TableCell className="">
                <StatusUpdateForm booking={booking} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}