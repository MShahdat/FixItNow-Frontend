
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
import { Categories, Meta } from "@/lib/interface"
import { getStatusVariant } from "../technicians/bookingTable"
import { CategoryForm } from "./categoryForm"

function formatStatus(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase()
}


export function AllCategoryList({ categories, meta }: { categories: Categories[]; meta?: Meta }) {

  const startIndex = ((meta?.page ?? 1) - 1) * ((meta?.limit ?? categories.length) || 1) + 1

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-green-800 hover:bg-green-700">
          <TableHead className="text-center text-white font-medium">No</TableHead>
          <TableHead className="text-center text-white font-medium">Name</TableHead>
          {/* <TableHead className="text-center text-white font-medium">Description</TableHead> */}
          <TableHead className="text-center text-white font-medium">Status</TableHead>
          <TableHead className="text-center text-white font-medium">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
              No category found.
            </TableCell>
          </TableRow>
        ) : (
          categories?.map((category: Categories, idx) => (
            <TableRow key={category.id} className="text-center">
              <TableCell>{startIndex + idx}</TableCell>
              <TableCell className="font-medium">
                {category.name}
              </TableCell>
              {/* <TableCell>{category.description}</TableCell> */}
              <TableCell>
                <Badge variant={getStatusVariant(category.status)}>
                  {formatStatus(category.status)}
                </Badge>
              </TableCell>
              <TableCell>
                <CategoryForm category={category} mode="edit" />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}