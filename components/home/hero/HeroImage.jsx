"use client";
import { ResponsiveBar } from "@nivo/bar";
import nivoTheme from "@/lib/nivo";

export default function HeroImage() {
  return (
    <div className="relative w-full h-full z-30">
      <div className="rounded-2xl overflow-hidden border border-white/8 w-full h-full bg-card-dark flex flex-col">
        {/* ── Window chrome ── */}
        <div className="flex items-center gap-2 px-[2.5%] py-[1.2%] bg-[#111214] border-b border-white/6 shrink-0">
          <div className="flex gap-[0.5%]">
            <div className="w-[1%] aspect-square rounded-full bg-[#FF5F57]" />
            <div className="w-[1%] aspect-square rounded-full bg-[#FEBC2E]" />
            <div className="w-[1%] aspect-square rounded-full bg-[#28C840]" />
          </div>
          <div className="mx-auto bg-white/5 rounded-md px-[2%] py-[0.4%] text-[1.1cqw] text-[#555] flex items-center gap-[0.5%]">
            <div className="w-[0.8cqw] h-[0.8cqw] rounded-full bg-[#4ADE80] shrink-0" />
            learnovasaas.vercel.app/dashboard
          </div>
          <div className="w-[5%]" />
        </div>

        {/* ── App shell ── */}
        <div className="flex flex-1 min-h-0">
          {/* Sidebar */}
          <div
            className="flex flex-col shrink-0 h-full border-r border-white/6 bg-card-dark overflow-hidden"
            style={{ width: "18%" }}
          >
            {/* Logo */}
            <div className="flex items-center gap-[6%] px-[10%] py-[5%] border-b border-white/6">
              <div className="w-[18%] aspect-square rounded-[25%] bg-brand flex items-center justify-center shrink-0">
                <svg
                  viewBox="0 0 10 10"
                  fill="none"
                  className="w-[60%] h-[60%]"
                >
                  <path
                    d="M2 8V4M5 8V2M8 8V5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-[1.3cqw] font-bold text-white truncate leading-none">
                  Learnova
                </p>
                <p className="text-[0.9cqw] text-[#555] uppercase tracking-widest mt-[3%]">
                  Student Portal
                </p>
              </div>
            </div>

            {/* Course selector */}
            <div className="px-[8%] py-[4%] border-b border-white/6">
              <p className="text-[0.8cqw] font-bold uppercase tracking-widest text-[#444] mb-[4%]">
                Current Course
              </p>
              <div className="flex items-center gap-[5%] px-[8%] py-[4%] bg-card-dark rounded-lg border border-white/4">
                <div className="w-[8%] aspect-square rounded-sm bg-brand/30 shrink-0" />
                <span className="text-[1cqw] text-white truncate flex-1">
                  DBMS — Sem 4
                </span>
                <svg viewBox="0 0 8 8" fill="none" className="w-[6%] shrink-0">
                  <path
                    d="M1 2.5L4 5.5L7 2.5"
                    stroke="#555"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Nav */}
            <div className="flex flex-col px-[6%] py-[4%] gap-[1%] flex-1 min-h-0 overflow-hidden">
              <p className="text-[0.8cqw] font-bold uppercase tracking-widest text-[#444] px-[4%] mb-[2%]">
                Main
              </p>
              {[
                { label: "Dashboard", active: true },
                { label: "My Courses" },
                { label: "Documents" },
              ].map(({ label, active }) => (
                <div
                  key={label}
                  className={`flex items-center gap-[8%] px-[8%] py-[3.5%] rounded-xl text-[1.1cqw] ${
                    active
                      ? "bg-brand/15 text-brand font-medium"
                      : "text-[#555]"
                  }`}
                >
                  <div
                    className={`w-[7%] aspect-square rounded-full shrink-0 ${active ? "bg-brand" : "bg-[#333]"}`}
                  />
                  <span className="truncate">{label}</span>
                  {active && (
                    <svg
                      viewBox="0 0 6 10"
                      fill="none"
                      className="w-[4%] ml-auto shrink-0"
                    >
                      <path
                        d="M1 1L5 5L1 9"
                        stroke="var(--color-brand)"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </div>
              ))}

              <p className="text-[0.8cqw] font-bold uppercase tracking-widest text-[#444] px-[4%] mt-[5%] mb-[2%]">
                Learning
              </p>
              {["Ask Your Notes", "Quiz Center", "Revision"].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-[8%] px-[8%] py-[3%] rounded-xl text-[1.1cqw] text-[#555]"
                >
                  <div className="w-[7%] aspect-square rounded-full shrink-0 bg-[#333]" />
                  <span className="truncate">{item}</span>
                </div>
              ))}

              {/* Upload button */}
              <div className="mt-auto px-[2%] pb-[4%]">
                <div className="flex items-center justify-center gap-[5%] px-[6%] py-[5%] bg-brand rounded-xl">
                  <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    className="w-[8%] shrink-0"
                  >
                    <path
                      d="M6 9V3M3 6l3-3 3 3"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="text-[1cqw] font-bold text-white truncate">
                    Upload Document
                  </span>
                </div>
                <div className="mt-[4%]">
                  <div className="flex justify-between mb-[3%]">
                    <span className="text-[0.8cqw] text-[#555]">Storage</span>
                    <span className="text-[0.8cqw] text-[#555]">
                      3.2 / 5 GB
                    </span>
                  </div>
                  <div className="h-[0.3cqw] bg-white/8 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand rounded-full"
                      style={{ width: "64%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-card-dark">
            {/* Top navbar */}
            <div className="flex items-center justify-between px-[2.5%] py-[1.5%] border-b border-white/6 shrink-0">
              {/* Search */}
              <div className="flex items-center gap-[1.5%] px-[2%] py-[1%] bg-card-dark rounded-xl border border-white/4 w-[35%]">
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  className="w-[1.2cqw] h-[1.2cqw] shrink-0"
                >
                  <circle
                    cx="5"
                    cy="5"
                    r="3.5"
                    stroke="#555"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M8 8l2 2"
                    stroke="#555"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-[1cqw] text-[#333]">
                  Search for concepts, quizzes...
                </span>
                <span className="ml-auto text-[0.8cqw] text-[#333] bg-white/4 px-[0.5em] py-[0.2em] rounded">
                  ⌘K
                </span>
              </div>

              {/* Right items */}
              <div className="flex items-center gap-[1em] mr-[1em] ">
                <div className="flex items-center gap-[5%] px-[10%] py-[1%] bg-[#FBBF24]/10 border border-[#FBBF24]/20 rounded-xl">
                  <div className="w-[0.6cqw] h-[0.6cqw] rounded-full bg-[#FBBF24] shrink-0" />
                  <span className="text-[0.9em] font-bold text-[#FBBF24] whitespace-nowrap">
                    3 due today
                  </span>
                </div>
                <div className="w-[2.2cqw] h-[2.2cqw] rounded-full bg-brand flex items-center justify-center shrink-0">
                  <span className="text-[0.9cqw] font-bold text-white">VR</span>
                </div>
              </div>
            </div>

            {/* Page content — scrollable area */}
            <div className="flex-1 overflow-hidden p-[2%] flex flex-col gap-[1.5%] min-h-0">
              {/* Welcome row */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[1.8cqw] font-bold text-white leading-tight">
                    Greetings
                  </p>
                  <p className="text-[1cqw] text-[#555] mt-[1%]">
                    Your mastery index is{" "}
                    <span className="text-[#4ADE80] font-bold">+12.4%</span>{" "}
                    higher than last week. Keep it up!
                  </p>
                </div>
                <div className="w-fit h-full">
                  <span className=" w-[7vw] px-[10%] py-[10%] bg-brand inline-block rounded-[.7em] text-[.8em] font-bold text-white">
                    New Session
                  </span>
                </div>
              </div>

              {/* Stat card-darks row */}
              <div className="grid grid-cols-4 gap-[1.5%] shrink-0">
                {[
                  {
                    label: "Overall Mastery",
                    ring: true,
                    pct: 84,
                    value: "84%",
                    delta: "↑ 3% this week",
                    deltaColor: "text-[#4ADE80]",
                    barColor: "border-brand",
                  },
                  {
                    label: "Concepts Mastered",
                    value: "32",
                    badge: "+5",
                    badgeColor: "text-[#4ADE80]",
                    sub: "of 58 total concepts",
                    barColor: "bg-brand",
                    barW: "55%",
                  },
                  {
                    label: "Needs Revision",
                    value: "6",
                    badge: "+2",
                    badgeColor: "text-[#FBBF24]",
                    sub: "concepts flagged",
                    barColor: "bg-[#FBBF24]",
                    barW: "30%",
                  },
                  {
                    label: "Critical Weakness",
                    value: "2",
                    badge: "-1",
                    badgeColor: "text-[#4ADE80]",
                    sub: "concepts below 40%",
                    barColor: "bg-[#F87171]",
                    barW: "10%",
                  },
                ].map(
                  ({
                    label,
                    ring,
                    pct,
                    value,
                    badge,
                    badgeColor,
                    delta,
                    deltaColor,
                    sub,
                    barColor,
                    barW,
                  }) => (
                    <div
                      key={label}
                      className="bg-card-dark rounded-xl p-[6%] border border-white/4 flex flex-col gap-[4%]"
                    >
                      <div className="flex items-start justify-between">
                        <p className="text-[0.8cqw] font-bold uppercase tracking-widest text-brand/70">
                          {label}
                        </p>
                        <svg
                          viewBox="0 0 8 8"
                          fill="none"
                          className="w-[0.8cqw] opacity-30"
                        >
                          <path
                            d="M1 4h6M4 1l3 3-3 3"
                            stroke="white"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>

                      {ring ? (
                        <div className="flex items-center gap-[8%]">
                          {/* Mini ring */}
                          <svg viewBox="0 0 36 36" className="w-[28%] shrink-0">
                            <circle
                              cx="18"
                              cy="18"
                              r="14"
                              fill="none"
                              stroke="rgba(255,255,255,0.06)"
                              strokeWidth="3"
                            />
                            <circle
                              cx="18"
                              cy="18"
                              r="14"
                              fill="none"
                              stroke="var(--color-brand)"
                              strokeWidth="3"
                              strokeDasharray={`${(pct / 100) * 87.96} 87.96`}
                              strokeLinecap="round"
                              transform="rotate(-90 18 18)"
                            />
                          </svg>
                          <div>
                            <p className="text-[1.8cqw] font-black text-white leading-none">
                              {value}
                            </p>
                            {delta && (
                              <p
                                className={`text-[0.85cqw] mt-[4%] font-medium ${deltaColor}`}
                              >
                                {delta}
                              </p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-baseline gap-[4%]">
                            <span className="text-[2cqw] font-black text-white leading-none">
                              {value}
                            </span>
                            {badge && (
                              <span
                                className={`text-[0.9cqw] font-bold ${badgeColor}`}
                              >
                                {badge}
                              </span>
                            )}
                          </div>
                          {sub && (
                            <p className="text-[0.85cqw] text-[#555] mt-[4%]">
                              {sub}
                            </p>
                          )}
                        </div>
                      )}

                      {!ring && (
                        <div className="h-[0.25cqw] bg-white/6 rounded-full overflow-hidden mt-auto">
                          <div
                            className={`h-full rounded-full ${barColor}`}
                            style={{ width: barW }}
                          />
                        </div>
                      )}
                    </div>
                  ),
                )}
              </div>

              {/* Bottom two columns */}
              <div className="grid grid-cols-2 gap-[1.5%] flex-1 min-h-0">
                {/* Concept mastery bars */}
                <div className="bg-card-dark rounded-xl p-[4%] border border-white/4 flex flex-col gap-[4%]">
                  <div>
                    <p className="text-[1.1cqw] font-semibold text-white">
                      Concept Mastery
                    </p>
                    <p className="text-[0.85cqw] text-[#555] mt-[1%]">
                      Per-topic breakdown
                    </p>
                  </div>

                  {/* Nivo bar chart */}
                  <div className="flex-1 min-h-0">
                    <ResponsiveBar
                      data={[
                        { topic: "ER", mastery: 48 },
                        { topic: "SQL", mastery: 62 },
                        { topic: "2NF", mastery: 86 },
                        { topic: "Idx", mastery: 55 },
                        { topic: "Nrm", mastery: 91 },
                      ]}
                      keys={["mastery"]}
                      indexBy="topic"
                      theme={nivoTheme}
                      maxValue={100}
                      colors={["var(--color-brand)"]}
                      margin={{ top: 16, right: 8, bottom: 28, left: 32 }}
                      padding={0.08}
                      borderRadius={6}
                      label={(d) => `${d.value}%`}
                      labelTextColor="#ffffff"
                      labelSkipWidth={0}
                      labelSkipHeight={0}
                      axisLeft={{
                        tickSize: 0,
                        tickPadding: 8,
                        tickValues: [0, 25, 50, 75, 100],
                      }}
                      axisBottom={{ tickSize: 0, tickPadding: 10 }}
                      background="transparent"
                    />
                  </div>
                </div>

                {/* Right column — mastery trend + chat snippet */}
                <div className="flex flex-col gap-[3%]">
                  {/* Mastery trend line */}
                  <div className="bg-card-dark rounded-xl p-[4%] border border-white/4 flex-1">
                    <div className="flex items-start justify-between mb-[4%]">
                      <div>
                        <p className="text-[1.1cqw] font-semibold text-white">
                          Mastery Trend
                        </p>
                        <p className="text-[0.85cqw] text-[#555] mt-[1%]">
                          Cross-subject proficiency
                        </p>
                      </div>
                      <div className="flex items-center gap-[4%]">
                        {["7D", "30D", "All"].map((t, i) => (
                          <span
                            key={t}
                            className={`text-[0.8cqw] font-bold px-[0.5em] py-[0.2em] rounded-lg ${
                              i === 1 ? "bg-brand text-white" : "text-[#444]"
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-[5%] mb-[3%]">
                      {[
                        { label: "Overall Mastery", color: "bg-brand" },
                        { label: "Quiz Accuracy", color: "bg-[#555]" },
                      ].map(({ label, color }) => (
                        <div key={label} className="flex items-center gap-[3%]">
                          <div
                            className={`h-[0.2cqw] w-[1.5cqw] rounded-full ${color}`}
                          />
                          <span className="text-[0.8cqw] text-[#555]">
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* SVG sparkline */}
                    <svg
                      viewBox="0 0 200 50"
                      preserveAspectRatio="none"
                      className="w-full h-[3cqw]"
                    >
                      <defs>
                        <linearGradient
                          id="heroGrad"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="var(--color-brand)"
                            stopOpacity="0.3"
                          />
                          <stop
                            offset="100%"
                            stopColor="var(--color-brand)"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>
                      {/* Area fill */}
                      <path
                        d="M0,45 C20,42 35,35 55,30 C75,25 90,28 110,22 C130,16 150,14 170,10 C185,7 195,6 200,5 L200,50 L0,50 Z"
                        fill="url(#heroGrad)"
                      />
                      {/* Main line */}
                      <path
                        d="M0,45 C20,42 35,35 55,30 C75,25 90,28 110,22 C130,16 150,14 170,10 C185,7 195,6 200,5"
                        fill="none"
                        stroke="var(--color-brand)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      {/* Secondary line */}
                      <path
                        d="M0,48 C25,46 45,44 70,40 C95,36 115,38 140,34 C160,30 180,28 200,25"
                        fill="none"
                        stroke="#555"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeDasharray="3,2"
                      />
                    </svg>

                    {/* Y labels */}
                    <div className="flex justify-between mt-[2%]">
                      {["70%", "80%", "90%"].map((l) => (
                        <span key={l} className="text-[0.7cqw] text-[#333]">
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* RAG chat snippet */}
                  <div className="bg-card-dark rounded-xl p-[4%] border border-white/4">
                    <div className="flex items-center justify-between mb-[3%]">
                      <p className="text-[0.85cqw] font-bold uppercase tracking-widest text-[#555]">
                        Ask Your Notes
                      </p>
                      <span className="text-[0.8cqw] font-bold text-brand bg-brand/10 px-[0.6em] py-[0.2em] rounded-full">
                        87% conf.
                      </span>
                    </div>

                    {/* User msg */}
                    <div className="flex justify-end mb-[2%]">
                      <div className="text-[0.9cqw] text-[#888] px-[3%] py-[1.5%] bg-[#2A2B2F] rounded-xl rounded-tr-xs max-w-[75%]">
                        Explain 2NF with an example.
                      </div>
                    </div>
                    {/* AI msg */}
                    <div className="text-[0.9cqw] text-[#ccc] px-[3%] py-[1.5%] bg-brand/[0.06] border border-brand/15 rounded-xl rounded-tl-sm max-w-[85%] leading-relaxed">
                      Based on{" "}
                      <span className="text-brand font-semibold">
                        DBMS_Notes.pdf
                      </span>{" "}
                      — 2NF requires every non-prime attribute to be fully
                      dependent on the entire primary key.
                    </div>

                    {/* Input bar */}
                    <div className="flex items-center gap-[2%] mt-[3%]">
                      <div className="flex-1 px-[3%] py-[2%] bg-[#141414] rounded-xl border border-white/6 text-[0.85cqw] text-[#333]">
                        Ask a follow-up...
                      </div>
                      <div className="w-[2.2cqw] h-[2.2cqw] rounded-lg bg-brand flex items-center justify-center shrink-0">
                        <svg
                          viewBox="0 0 12 12"
                          fill="none"
                          className="w-[55%] h-[55%]"
                        >
                          <path
                            d="M11 6L1 1.5l1.8 4.5L1 10.5 11 6z"
                            fill="black"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
