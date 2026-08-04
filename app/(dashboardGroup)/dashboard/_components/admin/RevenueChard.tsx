'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RevenueChartProps {
  data: { month: string; revenue: number }[]
}

const chartConfig: ChartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--color-chart-1)",
  },
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-75 w-full">
          <AreaChart data={data} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} stroke="var(--color-border)" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)" }}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)" }}
              tickMargin={8}
              tickFormatter={(v) => `$${v}`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              dataKey="revenue"
              type="monotone"
              fill="var(--color-chart-1)"
              fillOpacity={0.24}
              stroke="var(--color-chart-1)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}