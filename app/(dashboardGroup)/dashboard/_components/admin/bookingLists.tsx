'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { IBooking, Meta } from "@/lib/interface"
import { formatStatus, getStatusVariant } from "@/util/badgeStyle"


function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function AllBookingList({ bookings, meta }: { bookings: IBooking[]; meta?: Meta }) {

  const startIndex = ((meta?.page ?? 1) - 1) * ((meta?.limit ?? bookings.length) || 1) + 1

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-green-800 hover:bg-green-700">
          <TableHead className="text-center text-white font-medium">No</TableHead>
          <TableHead className="text-center text-white font-medium">Service</TableHead>
          <TableHead className="text-center text-white font-medium">Address</TableHead>
          <TableHead className="text-center text-white font-medium">Scheduled Date</TableHead>
          <TableHead className="text-center text-white font-medium">Duration</TableHead>
          <TableHead className="text-center text-white font-medium">Location</TableHead>
          <TableHead className="text-center text-white font-medium">Amount</TableHead>
          <TableHead className="text-center text-white font-medium">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
              No bookings found.
            </TableCell>
          </TableRow>
        ) : (
          bookings?.map((booking: IBooking, idx) => (
            <TableRow key={booking.id} className="text-center">
              <TableCell>{startIndex + idx}</TableCell>
              <TableCell className="font-medium">
                {booking.service.title}
              </TableCell>
              <TableCell>{booking.address}</TableCell>
              <TableCell>{formatDate(booking.scheduledDate)}</TableCell>
              <TableCell>{booking.service.duration}</TableCell>
              <TableCell>{booking.service.location.join(", ")}</TableCell>
              <TableCell>${booking.totalAmount}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(booking.status)}>
                  {formatStatus(booking.status)}
                </Badge>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}