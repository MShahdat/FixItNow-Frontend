
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
import { ActionButton } from "./ActionBtn"


interface BookingTableProps {
  bookings: any
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

export function MyBookingTable({ bookings }: BookingTableProps) {

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
          bookings?.map((booking: any) => (
            <TableRow key={booking.id} className="">
              <TableCell>{booking?.serviceTitle}</TableCell>
              <TableCell>
                {booking.technicianName}
              </TableCell>
              <TableCell>{booking.totalAmount}</TableCell>
              <TableCell>{booking.type}</TableCell>
              <TableCell className="capitalize">{booking.service?.type}</TableCell>
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
              <TableCell className="">
                <ActionButton status={booking.status} bookingId={booking.id} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}