"use client"
import { useState } from "react"
import { RiBookmarkLine, RiBookmarkFill, RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri"
import AnswerOption     from "./AnswerOption"
import ExplanationBlock from "./ExplanationBlock"

export default function QuestionCard({
  question, selected, onSelect, revealed,
  onSubmit, onNext, onPrev, isFirst, isLast,
}) {
  const [bookmarked, setBookmarked] = useState(false)

  const diffStyle = {
    Easy:   "text-[#4ADE80] bg-[#4ADE80]/10",
    Medium: "text-[#FBBF24] bg-[#FBBF24]/10",
    Hard:   "text-[#F87171] bg-[#F87171]/10",
  }[question.difficulty] ?? "text-[#888] bg-white/[0.06]"

  return (
    <div className="bg-card-dark rounded-2xl p-[clamp(1.25rem,2.5vw,2rem)] border border-white/4">

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-brand bg-brand/10 px-2.5 py-1 rounded-lg border border-brand/15">
            {question.concept}
          </span>
          <span className={`text-[10px] font-medium px-2.5 py-1 rounded-lg ${diffStyle}`}>
            {question.difficulty}
          </span>
        </div>
        <button
          onClick={() => setBookmarked(!bookmarked)}
          className="text-[#444] hover:text-brand transition-colors"
        >
          {bookmarked
            ? <RiBookmarkFill className="text-brand text-[16px]" />
            : <RiBookmarkLine className="text-[16px]" />
          }
        </button>
      </div>

      <p className="text-[clamp(14px,1.7vw,18px)] font-semibold text-white leading-[1.6] mb-6">
        {question.text}
      </p>

      {question.type === "mcq" && (
        <div className="flex flex-col gap-2.5">
          {question.options.map((opt) => (
            <AnswerOption
              key={opt.id}
              option={opt}
              selected={selected === opt.id}
              revealed={revealed}
              isCorrect={opt.id === question.correct}
              onClick={() => !revealed && onSelect(opt.id)}
            />
          ))}
        </div>
      )}

      {question.type === "truefalse" && (
        <div className="grid grid-cols-2 gap-3">
          {[{ id: "true", label: "True" }, { id: "false", label: "False" }].map((opt) => {
            const isSel  = selected === opt.id
            const isCorr = revealed && opt.id === question.correct
            const isWrng = revealed && isSel && !isCorr
            return (
              <button
                key={opt.id}
                onClick={() => !revealed && onSelect(opt.id)}
                className={`py-8 rounded-xl text-[16px] font-bold border transition-all ${
                  isCorr ? "border-[#4ADE80] bg-[#4ADE80]/6 text-[#4ADE80]"
                  : isWrng ? "border-[#F87171] bg-[#F87171]/6 text-[#F87171]"
                  : isSel ? "border-brand bg-brand/8 text-white"
                  : "border-white/6 bg-[#141414] text-[#888] hover:border-white/12 hover:text-white"
                }`}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      )}

      {revealed && (
        <div className="mt-5">
          <ExplanationBlock
            explanation={question.explanation}
            source={question.source}
            concept={question.concept}
            mastery={question.mastery}
          />
        </div>
      )}

      <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/6">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className={`flex items-center gap-2 px-4 py-2.5 text-[12px] font-medium rounded-xl border border-white/6 bg-[#141414] transition-all ${
            isFirst ? "opacity-30 cursor-not-allowed text-secondary-text" : "text-white hover:border-white/12"
          }`}
        >
          <RiArrowLeftLine className="text-[13px]" /> Previous
        </button>

        {!revealed ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => { onSelect(null); onNext() }}
              className="text-[11px] text-[#444] hover:text-[#888] underline transition-colors"
            >
              Skip
            </button>
            <button
              onClick={onSubmit}
              disabled={!selected}
              className={`flex items-center gap-2 px-5 py-2.5 bg-brand text-white text-[13px] font-bold rounded-xl transition-all ${
                !selected ? "opacity-40 cursor-not-allowed" : "hover:brightness-110"
              }`}
            >
              Submit <RiArrowRightLine className="text-[13px]" />
            </button>
          </div>
        ) : (
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-5 py-2.5 bg-brand text-white text-[13px] font-bold rounded-xl hover:brightness-110 transition-all"
          >
            {isLast ? "See Results" : "Next"} <RiArrowRightLine className="text-[13px]" />
          </button>
        )}
      </div>
    </div>
  )
}