
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IPaymentHistory } from "@/lib/interface"
import { formatStatus, getStatusVariant } from "@/util/badgeStyle"


type Props = {
  success: boolean,
  statusCode: number
  message: string
  data: IPaymentHistory[]
}



export function MyPaymentTable({ payments }: { payments: Props }) {

  if (!payments.success) {
    return
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