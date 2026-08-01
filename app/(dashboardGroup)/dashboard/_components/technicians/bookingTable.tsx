import { MoreHorizontalIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Booking {
  id: string
  customer: {
    firstName: string
    lastName: string
  }
  totalAmount: string
  service: {
    title: string
    duration: string
    type: string
  }
  scheduledDate: string
  status: "ACCEPTED" | "REQUESTED" | "REJECTED" | "COMPLETED" | "CANCELLED" | string
}

interface BookingTableProps {
  bookings: Booking[]
}

function getStatusVariant(status: string) {
  switch (status) {
    case "ACCEPTED":
      return "default"
    case "REQUESTED":
      return "secondary"
    case "REJECTED":
    case "CANCELLED":
      return "destructive"
    case "COMPLETED":
      return "outline"
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
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Service Title</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
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
          bookings?.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">
                {booking.customer.firstName} {booking.customer.lastName}
              </TableCell>
              <TableCell>{booking.service?.title}</TableCell>
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
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontalIcon />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}