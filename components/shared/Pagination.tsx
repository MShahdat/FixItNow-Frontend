"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { PaginationsProps } from "@/lib/interface"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useMemo, useCallback } from "react"


const SIBLING_COUNT = 1

export function Paginations({ meta }: PaginationsProps) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentPage = Number(searchParams.get("page") ?? 1)
  const totalPage = Math.max(meta.totalPage, 1)

  const goToPage = useCallback(
    (page: number) => {
      const safePage = Math.min(Math.max(page, 1), totalPage)

      const params = new URLSearchParams(searchParams.toString())
      params.set("page", String(safePage))

      router.push(`${pathname}?${params.toString()}`)
    },
    [pathname, router, searchParams, totalPage]
  )

  const pageItems = useMemo(() => {
    const items: (number | "ellipsis")[] = []

    const start = Math.max(currentPage - SIBLING_COUNT, 1)
    const end = Math.min(currentPage + SIBLING_COUNT, totalPage)

    // always show first page
    items.push(1)

    if (start > 2) {
      items.push("ellipsis")
    }

    for (let page = Math.max(start, 2); page <= Math.min(end, totalPage - 1); page++) {
      items.push(page)
    }

    if (end < totalPage - 1) {
      items.push("ellipsis")
    }

    // always show last page (if more than 1 page)
    if (totalPage > 1) {
      items.push(totalPage)
    }

    return items
  }, [currentPage, totalPage])

  if (totalPage <= 1) return null

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault()
              goToPage(currentPage - 1)
            }}
            aria-disabled={currentPage === 1}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>

        {pageItems.map((item, idx) =>
          item === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                isActive={item === currentPage}
                onClick={(e) => {
                  e.preventDefault()
                  goToPage(item)
                }}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault()
              goToPage(currentPage + 1)
            }}
            aria-disabled={currentPage === totalPage}
            className={currentPage === totalPage ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}