'use client'

import { Cell, Pie, PieChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookingStatus } from "@/lib/interface"

interface BookingStatusChartProps {
  data: { status: string; count: number }[]
}

const STATUS_COLORS: Record<BookingStatus, string> = {
  REQUESTED: "var(--color-chart-1)",
  ACCEPTED: "var(--color-chart-2)",
  IN_PROGRESS: "var(--color-chart-3)",
  COMPLETED: "var(--color-chart-4)",
  DECLINED: "var(--color-chart-5)",
  CANCELLED: "var(--color-destructive)",
}

const chartConfig: ChartConfig = Object.fromEntries(
  Object.entries(STATUS_COLORS).map(([status, color]) => [
    status,
    { label: status.replace("_", " "), color },
  ])
)

export function BookingStatusChart({ data }: BookingStatusChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Status Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-75 w-full">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="status" />} />
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              stroke="var(--color-border)"
              strokeWidth={4}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.status}
                  fill={STATUS_COLORS[entry.status as BookingStatus] ?? "var(--color-muted)"}
                />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="status" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}