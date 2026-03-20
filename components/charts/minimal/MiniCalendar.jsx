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
    <div style={{ height: "160px" }} className="w-full">
      <ResponsiveCalendar
        data={data}
        theme={nivoTheme}
        from="2026-01-01"
        to="2026-06-30"
        emptyColor="#2a2b2f"
        colors={[
          "rgba(250,110,67,0.2)",
          "rgba(250,110,67,0.45)",
          "rgba(250,110,67,0.7)",
          "#FA6E43",
        ]}
        margin={{ top: 25, right: 8, bottom: 8, left: 8 }}
        yearSpacing={0}
        monthBorderWidth={0}
        dayBorderWidth={2}
        dayBorderColor="#212225"
        tooltip={({ day, value }) => (
          <div className="bg-[#1a1b1e] border border-white/10 rounded-lg px-3 py-1.5 text-[11px] text-white">
            {day}:{" "}
            <span className="text-[#FA6E43] font-bold">{value} sessions</span>
          </div>
        )}
      />
    </div>
  );
}
