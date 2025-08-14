import * as React from "react";
import { PieChart, Pie } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { Any, NormalizedDrink } from "@/lib/types";
import { generateGradient, slug, titleCase } from "@/lib/utils";

interface Props {
  drinks: NormalizedDrink[];
  type: "alcoholic" | "category" | "glass";
  limit?: number;
}

export function PieCharts({ drinks = [], type, limit = 7 }: Props) {
  const groups = React.useMemo(() => {
    const map = new Map<string, number>();

    if (type === "alcoholic") {
      let alc = 0;
      let non = 0;
      for (const d of drinks) {
        if (d.isAlcoholic === true) alc += 1;
        else if (d.isAlcoholic === false) non += 1;
      }
      map.set("alcoholic", alc);
      map.set("non-alcoholic", non);
    } else if (type === "category") {
      for (const d of drinks) {
        if (!d.category) continue;
        const key = d.category.trim();
        map.set(key, (map.get(key) ?? 0) + 1);
      }
    } else if (type === "glass") {
      for (const d of drinks) {
        if (!d.glass) continue;
        const key = d.glass.trim();
        map.set(key, (map.get(key) ?? 0) + 1);
      }
    }

    const sorted = Array.from(map.entries()).sort((a, b) => b[1] - a[1]);

    if (type === "alcoholic") return sorted;

    if (sorted.length > limit) {
      const head = sorted.slice(0, limit - 1);
      const tail = sorted.slice(limit - 1);
      const otherCount = tail.reduce((sum, [, c]) => sum + c, 0);
      return [...head, ["Other", otherCount] as const];
    }

    return sorted;
  }, [drinks, type, limit]);

  const { chartConfig, data, cssVars } = React.useMemo(() => {
    const palette = generateGradient("#3b82f6", "#ff0000", 6);

    const config: ChartConfig = {} as ChartConfig;
    const chartData: Array<{
      id: string;
      label: string;
      count: number;
      fill: string;
    }> = [];
    const cssVarMap: Record<string, string> = {};

    groups.forEach(([label, count], idx) => {
      const id = slug(label || "unknown");
      const color = palette[idx % palette.length];
      config[id] = { label: titleCase(label || "Unknown"), color } as Any;
      chartData.push({
        id,
        label: titleCase(label || "Unknown"),
        count,
        fill: `var(--color-${id})`,
      });
      cssVarMap[`--color-${id}`] = color;
    });

    return { chartConfig: config, data: chartData, cssVars: cssVarMap };
  }, [groups]);

  if (!data.length) return null;

  return (
    <div className="flex items-center w-full gap-4" style={cssVars}>
      <ChartContainer className=" h-48 w-48" config={chartConfig}>
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={data}
            dataKey="count"
            nameKey="label"
            outerRadius={80}
            strokeWidth={2}
          />
        </PieChart>
      </ChartContainer>
      <div className="flex flex-col gap-2">
        {data.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-sm"
              style={{ backgroundColor: `var(--color-${item.id})` }}
            ></span>
            <span className="text-xs font-semibold">
              {item.label} ({item.count})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
