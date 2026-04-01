import { RiFileTextLine, RiSlideshowLine } from "react-icons/ri"

const sources = [
  {
    icon:       RiFileTextLine,
    name:       "DBMS_Complete_Notes.pdf",
    location:   "Chapter 4 · Pages 62–71 · 2,400 words",
    chunks:     "4 relevant chunks",
    confidence: "0.93",
  },
  {
    icon:       RiSlideshowLine,
    name:       "Unit3_Slides.pptx",
    location:   "Slides 14–22 · 680 words",
    chunks:     "2 relevant chunks",
    confidence: "0.81",
  },
]

export default function SourceReferences() {
  return (
    <div className="bg-card rounded-2xl p-6">
      <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-brand)/70 mb-1">
        Source Material
      </p>
      <h2 className="text-[clamp(14px,1.7vw,16px)] font-semibold text-white mb-1">
        Where This Concept Appears
      </h2>
      <p className="text-[12px] text-(--color-tertiary-text) mb-4">
        All document sections containing Normalization content.
      </p>

      <div className="flex flex-col gap-3">
        {sources.map(({ icon: Icon, name, location, chunks, confidence }) => (
          <div
            key={name}
            className="flex items-start gap-3.5 bg-card-dark rounded-xl p-4"
          >
            <div className="w-9 h-9 rounded-xl bg-(--color-brand)/10 flex items-center justify-center flex-shrink-0">
              <Icon className="text-(--color-brand) text-[16px]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-white mb-0.5">{name}</p>
              <p className="text-[11px] text-(--color-secondary-text)">{location}</p>
              <p className="text-[10px] text-(--color-tertiary-text) mt-0.5">
                {chunks} · Highest confidence: {confidence}
              </p>
            </div>
            <button className="text-[11px] text-(--color-brand) hover:underline flex-shrink-0 mt-0.5 whitespace-nowrap">
              Open in AI Chat →
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-start gap-2 bg-card-dark rounded-xl p-3.5">
        <span className="text-(--color-brand) text-[12px] flex-shrink-0 mt-0.5">◈</span>
        <p className="text-[11px] text-(--color-tertiary-text) leading-relaxed">
          Click "Open in AI Chat" to ask targeted questions about this concept directly from these sections.
        </p>
      </div>
    </div>
  )
}