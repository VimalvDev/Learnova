import Link from "next/link"
import OnboardingCard from "./OnboardingCard"

const nextActions = [
  {
    icon: "▶",
    title: "Start your first adaptive quiz",
    subtitle: "Establish your mastery baseline immediately",
    action: "Start →",
    href: "/dashboard/quizzes",
  },
  {
    icon: "💬",
    title: "Ask a question from your notes",
    subtitle: "Test the RAG engine with your uploaded material",
    action: "Open Chat →",
    href: "/dashboard/chat",
  },
  {
    icon: "📅",
    title: "View your revision schedule",
    subtitle: "See when Learnova has planned your first session",
    action: "View →",
    href: "/dashboard/revision",
  },
]

export default function StepComplete({ formData }) {
  return (
    <OnboardingCard>

      {/* Completion mark */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-[#FA6E43]/12 border border-[#FA6E43]/25 flex items-center justify-center mb-4">
          <span className="text-[#FA6E43] text-[28px]">◈</span>
        </div>
        <h2 className="text-[24px] font-bold text-white">Your Learning System Is Ready.</h2>
        <p className="text-[14px] text-[#888] mt-2 leading-[1.7] max-w-[400px]">
          Learnova has configured your adaptive engine based on your profile.
          Your first mastery baseline will be established after your first quiz session.
        </p>
      </div>

      {/* Summary */}
      <div className="bg-[#2A2B2F] border border-white/[0.06] rounded-xl overflow-hidden mb-5">
        {[
          ["Course created",         formData.courseName || "—"],
          ["Documents processed",    formData.uploadedFile ? `1 file · Ready` : "No file uploaded"],
          ["Revision schedule",      "Active from today"],
          ["First quiz",             "Ready to generate"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05] last:border-0"
          >
            <span className="text-[12px] text-[#555]">{label}</span>
            <span className="text-[13px] text-white font-medium">{value}</span>
          </div>
        ))}
      </div>

      {/* Next actions */}
      <div className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#FA6E43] mb-3">
          Recommended Next Steps
        </p>
        <div className="flex flex-col gap-2">
          {nextActions.map(({ icon, title, subtitle, action, href }) => (
            <Link
              key={title}
              href={href}
              className="flex items-center gap-3 px-4 py-3 bg-[#2A2B2F] border border-white/[0.06] rounded-xl hover:border-white/[0.12] transition-all group"
            >
              <span className="text-[#FA6E43] text-[14px] flex-shrink-0">{icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-white font-medium">{title}</p>
                <p className="text-[11px] text-[#555]">{subtitle}</p>
              </div>
              <span className="text-[12px] text-[#FA6E43] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                {action}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA buttons */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="flex-1 h-[48px] bg-[#FA6E43] text-white text-[14px] font-bold rounded-xl flex items-center justify-center hover:brightness-110 transition-all"
        >
          Go to Dashboard
        </Link>
        <Link
          href="/dashboard/quizzes"
          className="flex-1 h-[48px] bg-[#2A2B2F] border border-white/[0.08] text-white text-[14px] font-medium rounded-xl flex items-center justify-center hover:bg-[#2A2B2F] hover:border-white/[0.16] transition-all"
        >
          Generate First Quiz
        </Link>
      </div>

    </OnboardingCard>
  )
}
