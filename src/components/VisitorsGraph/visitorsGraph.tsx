"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "#4285F4" }, 
  { browser: "safari", visitors: 200, fill: "#FF9500" }, 
  { browser: "firefox", visitors: 287, fill: "#FF7139" }, 
  { browser: "edge", visitors: 173, fill: "#0078D7" }, 
  { browser: "other", visitors: 190, fill: "#A0A0A0" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "#4285F4",
  },
  safari: {
    label: "Safari",
    color: "#FF9500",
  },
  firefox: {
    label: "Firefox",
    color: "#FF7139",
  },
  edge: {
    label: "Edge",
    color: "#0078D7",
  },
  other: {
    label: "Other",
    color: "#A0A0A0",
  },
} satisfies ChartConfig

export function VisitorsGraph() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}