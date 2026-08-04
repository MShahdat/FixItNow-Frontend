'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface UserRoleChartProps {
  data: { role: string; count: number }[]
}

const chartConfig: ChartConfig = {
  count: {
    label: "Users",
    color: "var(--color-chart-2)",
  },
}

export function UserRoleChart({ data }: UserRoleChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users by Role</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-65 w-full">
          <BarChart data={data} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} stroke="var(--color-border)" />
            <XAxis
              dataKey="role"
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
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}