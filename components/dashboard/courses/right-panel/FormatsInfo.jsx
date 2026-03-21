import {
  RiFileTextLine, RiFileLine, RiImageLine,
  RiPencilLine, RiSlideshowLine,
} from "react-icons/ri"

const formats = [
  { icon: RiFileTextLine,  type: "PDF",          desc: "Digital & scanned"  },
  { icon: RiFileLine,      type: "DOCX",         desc: "Microsoft Word"     },
  { icon: RiImageLine,     type: "JPG / PNG",    desc: "Photos of notes"    },
  { icon: RiPencilLine,    type: "Handwritten",  desc: "OCR-powered"        },
  { icon: RiSlideshowLine, type: "PPTX",         desc: "Lecture slides"     },
]

export default function FormatsInfo() {
  return (
    <div className="bg-[#171717] rounded-2xl p-5 mt-4">
      <span className="text-[10px] font-bold uppercase tracking-widest text-[#FA6E43]/80 block mb-1">
        File Support
      </span>
      <h3 className="text-[14px] font-semibold text-white/90 mb-3">Accepted Formats</h3>

      <div className="flex flex-col">
        {formats.map(({ icon: Icon, type, desc }) => (
          <div
            key={type}
            className="flex items-center gap-3 py-2.5 border-b border-white/[0.04] last:border-0"
          >
            <Icon className="text-[#FA6E43]/60 text-[15px] flex-shrink-0" />
            <span className="text-[12px] font-medium text-white flex-1">{type}</span>
            <span className="text-[11px] text-[#555]">{desc}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-start gap-2 p-3 bg-[#111] rounded-xl">
        <span className="text-[#FA6E43] text-[12px] mt-0.5 flex-shrink-0">ⓘ</span>
        <p className="text-[11px] text-[#555] leading-relaxed">
          Scanned PDFs and handwritten notes are processed using OCR.
          Quality depends on image clarity.
        </p>
      </div>
    </div>
  )
}