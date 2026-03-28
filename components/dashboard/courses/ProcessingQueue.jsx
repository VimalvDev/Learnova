import { RiFileTextLine, RiCloseLine, RiCheckLine, RiAlertLine } from "react-icons/ri"

const stages = ["Uploading", "Extracting", "Chunking", "Embedding", "Complete"]

const queueFiles = [
  {
    id: 1,
    name: "ER_Diagram_Notes.pdf",
    type: "PDF",
    size: "2.1 MB",
    stage: 3,
    progress: 68,
    words: 6240,
    chunks: 52,
    eta: "~12s",
    status: "processing",
  },
  {
    id: 2,
    name: "DBMS_Complete_Notes.pdf",
    type: "PDF",
    size: "3.2 MB",
    stage: 4,
    progress: 100,
    words: 8400,
    chunks: 84,
    eta: null,
    status: "complete",
  },
  {
    id: 3,
    name: "Scanned_Handout.pdf",
    type: "PDF",
    size: "5.1 MB",
    stage: 1,
    progress: 0,
    words: 0,
    chunks: 0,
    eta: null,
    status: "error",
    error: "OCR error on page 7",
  },
]

function StageIndicator({ stage, activeStage }) {
  return (
    <div className="flex items-center">
      {stages.map((s, i) => {
        const done    = i < activeStage
        const active  = i === activeStage
        const pending = i > activeStage
        return (
          <div key={s} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0 transition-all"
                style={{
                  background: done
                    ? "#FA6E43"
                    : active
                    ? "#FA6E43"
                    : "rgba(255,255,255,0.08)",
                  boxShadow: active ? "0 0 0 3px rgba(250,110,67,0.2)" : "none",
                }}
              />
            </div>
            {i < stages.length - 1 && (
              <div
                className="w-8 h-[2px] mx-0.5 transition-all"
                style={{
                  background: done ? "#FA6E43" : "rgba(255,255,255,0.06)",
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

function Queuecard-dark({ file }) {
  const isComplete = file.status === "complete"
  const isError    = file.status === "error"

  return (
    <div
      className="bg-[#111] rounded-2xl p-4 mb-3"
      style={{
        border: isComplete
          ? "1px solid rgba(74,222,128,0.15)"
          : isError
          ? "1px solid rgba(248,113,113,0.15)"
          : "1px solid transparent",
      }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-7 h-7 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
          <RiFileTextLine className="text-[13px] text-white/60" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-white">{file.name}</p>
          <p className="text-[10px] text-secondary-text mt-0.5">{file.type} · {file.size}</p>
        </div>
        {!isComplete && !isError && (
          <button className="text-[11px] text-secondary-text hover:text-white transition-colors flex-shrink-0">
            Cancel
          </button>
        )}
        {isComplete && (
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <RiCheckLine className="text-[#4ADE80] text-[14px]" />
            <span className="text-[11px] text-[#4ADE80]">Complete</span>
          </div>
        )}
      </div>

      {isError ? (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <RiAlertLine className="text-[#FBBF24] text-[14px]" />
            <span className="text-[12px] text-[#888]">Processing failed — {file.error}</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 bg-[#171717] text-[#F87171] text-[11px] font-medium rounded-lg border border-[#F87171]/20 hover:bg-[#F87171]/5 transition-all">
              Retry Processing
            </button>
            <button className="text-[11px] text-secondary-text hover:text-white transition-colors">
              Remove
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-2">
            <StageIndicator stage={file.stage - 1} activeStage={file.stage - 1} />
            <span className="text-[10px] text-secondary-text ml-3">{stages[file.stage - 1]}</span>
          </div>

          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-secondary-text">{file.progress}%</span>
              {file.eta && <span className="text-[10px] text-secondary-text">{file.eta} remaining</span>}
            </div>
            <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${file.progress}%`,
                  background: isComplete ? "#4ADE80" : "#FA6E43",
                }}
              />
            </div>
          </div>

          {file.words > 0 && (
            <p className="text-[10px] text-secondary-text mt-2">
              {file.words.toLocaleString()} words · {file.chunks} chunks
              {isComplete && " · 84 embeddings · Ready for AI chat and quizzes"}
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default function ProcessingQueue() {
  return (
    <div className="mt-4">
      <span className="text-[10px] font-bold uppercase tracking-widest text-brand/80 block mb-3">
        Processing Queue
      </span>
      {queueFiles.map((file) => (
        <Queuecard-dark key={file.id} file={file} />
      ))}
    </div>
  )
}