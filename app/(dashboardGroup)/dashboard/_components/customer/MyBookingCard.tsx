
import { Badge } from "@/components/ui/badge"
import { ActionButton } from "./ActionBtn"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Booking } from "@/lib/interface"



function getStatusVariant(status: string) {
  switch (status) {
    case "ACCEPTED":
      return "accepted"
    case "REQUESTED":
      return "requested"
    case "DECLINED":
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

function StatItem({
  icon,
  label,
  value,
  valueClassName = "text-neutral-900",
}: {
  icon: React.ReactNode
  label: string
  value: string
  valueClassName?: string
}) {
  return (
    <div className="flex flex-col items-center gap-2 px-2 text-center">
      {icon}
      <span className="text-sm text-neutral-500">{label}</span>
      <span className={`text-sm font-bold ${valueClassName}`}>{value}</span>
    </div>
  )
}


export function MyBookingCard({ booking }: { booking: Booking }) {
  return (
    <Card
      key={booking.id}
      className="flex flex-col justify-between overflow-hidden rounded-2xl border-border/60 py-0 shadow-sm transition-shadow hover:shadow-md"
    >
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pt-5">
        <div>
          <CardTitle className="text-base leading-tight">
            {booking.serviceTitle}
          </CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            with {booking.technicianName}
          </p>
        </div>
        <Badge variant={getStatusVariant(booking.status)}>
          {formatStatus(booking.status)}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Date</span>
          <span>
            {new Date(booking.scheduledDate).toLocaleDateString("en-US", {
              month: "numeric",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Type</span>
          <span className="capitalize">{booking.type}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Duration</span>
          <span>{booking.duration}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${booking.totalAmount.toFixed(2)}</span>
        </div>
      </CardContent>

      <CardFooter className="mt-4 bg-gradient-to-r h-20 from-violet-950 to-purple-800 py-3">
        <ActionButton booking={booking} />
      </CardFooter>
    </Card>


  )
}