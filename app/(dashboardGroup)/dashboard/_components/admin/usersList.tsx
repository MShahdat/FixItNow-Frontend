
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
import { IUser, Meta } from "@/lib/interface"
import { StatusUpdateForm } from "./statusUpdateForm"

function getStatusVariant(status: string) {
  switch (status) {
    case "ACTIVE":
      return "default"
    case "BLOCKED":
      return "declined"
    default:
      return "secondary"
  }
}

function formatStatus(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase()
}


export function UsersList({ users, meta }: { users: IUser[]; meta: Meta }) {

  const startIndex = ((meta?.page ?? 1) - 1) * ((meta?.limit ?? users.length) || 1) + 1

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-green-800 hover:bg-green-700 ">
          <TableHead className="text-center text-white font-medium">No</TableHead>
          <TableHead className="text-center text-white font-medium">Name</TableHead>
          <TableHead className="text-center text-white font-medium">Email</TableHead>
          <TableHead className="text-center text-white font-medium">Phone</TableHead>
          <TableHead className="text-center text-white font-medium">Role</TableHead>
          <TableHead className="text-center text-white font-medium">Experience</TableHead>
          <TableHead className="text-center text-white font-medium">Hourly Rate</TableHead>
          <TableHead className="text-center text-white font-medium">Complete Jobs</TableHead>
          <TableHead className="text-center text-white font-medium">Status</TableHead>
          <TableHead className="text-center text-white font-medium">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={10} className="h-24 text-center text-muted-foreground">
              No users found.
            </TableCell>
          </TableRow>
        ) : (
          users?.map((user: IUser, idx) => (
            <TableRow key={user.id} className="text-center">
              <TableCell>{startIndex + idx}</TableCell>
              <TableCell className="font-medium">
                {user.fullName}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                {user.experience
                  ? `${user.experience} yrs`
                  : "-"}
              </TableCell>
              <TableCell>
                {user.hourlyRate
                  ? `$${user.hourlyRate}/hr`
                  : "-"}
              </TableCell>
              <TableCell>
                {user.completedJobs
                  ? user.completedJobs
                  : "-"}
              </TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(user.status)}>
                  {formatStatus(user.status)}
                </Badge>
              </TableCell>
              <TableCell>
                <StatusUpdateForm user={user} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}