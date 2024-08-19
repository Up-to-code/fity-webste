"use client";

import { useEffect } from "react";
import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useTimer } from "@/lib/store/Timer"; // Adjust the import path accordingly

const chartConfig = {
  visitors: {
    label: "time",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function TimerChart() {
  const { time, getMinutes, getHours, resetTimer } = useTimer();

  // Define the data for the chart
  const chartData = [
    { browser: "safari", visitors: time, fill: "var(--color-safari)" },
  ];

  // If you need to reset the timer when the component mounts or unmounts, use useEffect
  useEffect(() => {
    resetTimer();
  }, [resetTimer]);

  return (
    <div className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] scale-110"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={(chartData[0].visitors / 3000) * 360} // Adjust based on the full time in seconds
            innerRadius={80}
            outerRadius={120}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[87, 70]}
            />
            <RadialBar dataKey="visitors" background cornerRadius={20} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].visitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                                  <tspan
                          x={viewBox.cx }
                          y={(viewBox.cy || 0) + 26}
                          className="fill-muted-foreground text-base"
                        >
                          {`Minutes: ${getMinutes()}`}
                        </tspan>
                        </tspan>
                
                
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* Additional footer content if needed */}
      </CardFooter>
    </div>
  );
}
