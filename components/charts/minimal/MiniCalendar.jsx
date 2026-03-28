"use client";

import { ResponsiveCalendar } from "@nivo/calendar";
import nivoTheme from "@/lib/nivo";

const data = [
  { day: "2026-01-06", value: 3 },
  { day: "2026-01-12", value: 5 },
  { day: "2026-02-03", value: 4 },
  { day: "2026-02-10", value: 8 },
  { day: "2026-02-17", value: 6 },
  { day: "2026-03-01", value: 9 },
  { day: "2026-03-03", value: 10 },
  { day: "2026-03-05", value: 7 },
  { day: "2026-03-08", value: 10 },
  { day: "2026-03-10", value: 8 },
  { day: "2026-03-12", value: 9 },
  { day: "2026-03-14", value: 10 },
  { day: "2026-04-07", value: 4 },
  { day: "2026-04-14", value: 5 },
  { day: "2026-05-05", value: 6 },
  { day: "2026-05-12", value: 8 },
];

export default function MiniCalendar() {
  return (
    <div className="w-full h-full min-h-[160px]">
      <ResponsiveCalendar
        data={data}
        theme={{
          ...nivoTheme,
          labels: {
            text: {
              fill: "var(--color-mid-gray)",
              fontSize: 10,
              fontWeight: 400,
            },
          },
          axis: {
            ticks: {
              text: {
                fill: "var(--color-mid-gray)",
                fontSize: 10,
                fontWeight: 400,
              },
            },
          },
        }}
        from="2026-01-01"
        to="2026-06-30"
        emptyColor="var(--color-card-mid)"
        colors={[
          "color-mix(in srgb, var(--color-brand) 20%, var(--color-dark))",
          "color-mix(in srgb, var(--color-brand) 45%, var(--color-dark))",
          "color-mix(in srgb, var(--color-brand) 70%, var(--color-dark))",
          "var(--color-brand)",
        ]}
        margin={{ top: 25, right: 8, bottom: 8, left: 20 }}
        yearSpacing={0}
        monthBorderWidth={0}
        dayBorderWidth={2}
        dayBorderColor="var(--color-card)"
        tooltip={({ day, value }) => (
          <div className="bg-card border border-white/[0.08] rounded-lg px-3 py-1.5 text-[11px] text-white">
            {day}:{" "}
            <span className="text-brand font-bold">{value} sessions</span>
          </div>
        )}
      />
    </div>
  );
}