
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


type Pay = {
  id: string
  bookingId: string
  technicianName: string
  serviceTitle: string
  serviceType: string
  amount: number
  status: string
  transactionId: string
  paymentIntentId: string
  paidAt: string
}


type Props = {
  success: boolean,
  statusCode: number
  message: string
  data: Pay[]
}


function getStatusVariant(status: string) {
  switch (status) {
    case "PENDING":
      return "inProgress"
    case "PAID":
      return "accepted"
    case 'FAILED':
      return "cancelled"
    case "REFUNDED":
      return "requested"
    default:
      return "secondary"
  }
}


export function MyPaymentTable({ payments }: { payments: Props }) {

  if (!payments.success || !payments.data?.length) {
    return (
      <p className="py-12 text-center text-red-700">You did not payment yet</p>
    )
  }

  function formatStatus(status: string) {
    return status.charAt(0) + status.slice(1).toLowerCase()
  }
  return (
    <div>
      <p className="text-xl md:text-2xl font-semibold">Information</p>
      <Table className="max-w-6xl">
        <TableHeader>
          <TableRow className="text-center">
            <TableHead>Transection Id</TableHead>
            <TableHead>Service Title</TableHead>
            <TableHead>Total Amount</TableHead>
            {/* <TableHead>Type</TableHead> */}
            <TableHead>Status</TableHead>
            <TableHead>Paid At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments?.data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                No bookings found.
              </TableCell>
            </TableRow>
          ) : (
            payments?.data.map((payment: any) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.transactionId}</TableCell>
                <TableCell>{payment.serviceTitle}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                {/* <TableCell>{payment.serviceType}</TableCell> */}
                <TableCell>
                  <Badge variant={getStatusVariant(payment.status)}>
                    {formatStatus(payment.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(payment.paidAt).toLocaleDateString("en-US", {
                    month: "numeric",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}