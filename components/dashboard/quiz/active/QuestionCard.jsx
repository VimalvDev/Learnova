"use client"
import { useState } from "react"
import { RiBookmarkLine, RiBookmarkFill, RiArrowLeftLine, RiArrowRightLine, RiLoader4Line } from "react-icons/ri"
import AnswerOption     from "./AnswerOption"
import ExplanationBlock from "./ExplanationBlock"

export default function QuestionCard({
  question, selected, onSelect,
  textAnswer, onTextAnswer,
  revealed, evaluating, evalResult,
  onSubmit, onNext, onSkip,
  isFirst, isLast, canSubmit,
}) {
  const [bookmarked, setBookmarked] = useState(false)

  const isTextType = question.type === "short" || question.type === "fill"

  const diffStyle = {
    Easy:   "text-[#4ADE80] bg-[#4ADE80]/10",
    Medium: "text-[#FBBF24] bg-[#FBBF24]/10",
    Hard:   "text-[#F87171] bg-[#F87171]/10",
  }[question.difficulty] ?? "text-[#888] bg-white/[0.06]"

  const typeLabel = {
    mcq:       "Multiple Choice",
    truefalse: "True / False",
    short:     "Short Answer",
    fill:      "Fill in the Blank",
  }[question.type] ?? question.type

  return (
    <div className="bg-card-dark rounded-2xl p-[clamp(1.25rem,2.5vw,2rem)] border border-white/[0.04]">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-bold text-brand bg-brand/10 px-2.5 py-1 rounded-lg border border-brand/15">
            {question.concept}
          </span>
          <span className={`text-[10px] font-medium px-2.5 py-1 rounded-lg ${diffStyle}`}>
            {question.difficulty}
          </span>
          <span className="text-[10px] text-[#555] bg-white/[0.04] px-2.5 py-1 rounded-lg">
            {typeLabel}
          </span>
        </div>
        <button onClick={() => setBookmarked(!bookmarked)} className="text-[#444] hover:text-brand transition-colors">
          {bookmarked ? <RiBookmarkFill className="text-brand text-[16px]" /> : <RiBookmarkLine className="text-[16px]" />}
        </button>
      </div>

      {/* Question */}
      <p className="text-[clamp(14px,1.7vw,18px)] font-semibold text-white leading-[1.6] mb-6">
        {question.text}
      </p>

      {/* MCQ */}
      {question.type === "mcq" && (
        <div className="flex flex-col gap-2.5">
          {(question.options ?? []).map((opt, i) => {
            const letter  = ["A", "B", "C", "D"][i]
            const optId   = letter
            const isSel   = selected === optId
            const isCorr  = revealed && optId === question.correct?.charAt(0).toUpperCase()
            const isWrong = revealed && isSel && !isCorr
            return (
              <AnswerOption
                key={optId}
                option={{ id: optId.toLowerCase(), text: opt.replace(/^[A-D]\.\s*/i, "") }}
                selected={isSel}
                revealed={revealed}
                isCorrect={isCorr}
                isWrong={isWrong}
                onClick={() => !revealed && onSelect(optId)}
              />
            )
          })}
        </div>
      )}

      {/* True/False */}
      {question.type === "truefalse" && (
        <div className="grid grid-cols-2 gap-3">
          {[{ id: "true", label: "True" }, { id: "false", label: "False" }].map((opt) => {
            const isSel  = selected === opt.id
            const isCorr = revealed && opt.id === question.correct?.toLowerCase()
            const isWrng = revealed && isSel && !isCorr
            return (
              <button
                key={opt.id}
                onClick={() => !revealed && onSelect(opt.id)}
                className={`py-8 rounded-xl text-[16px] font-bold border transition-all ${
                  isCorr ? "border-[#4ADE80] bg-[#4ADE80]/[0.06] text-[#4ADE80]"
                  : isWrng ? "border-[#F87171] bg-[#F87171]/[0.06] text-[#F87171]"
                  : isSel ? "border-brand bg-brand/[0.08] text-white"
                  : "border-white/[0.06] bg-[#141414] text-[#888] hover:border-white/12 hover:text-white"
                }`}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      )}

      {/* Short Answer / Fill Blank */}
      {isTextType && (
        <div className="flex flex-col gap-3">
          <textarea
            value={textAnswer}
            onChange={(e) => !revealed && onTextAnswer(e.target.value)}
            disabled={revealed}
            placeholder={
              question.type === "fill"
                ? "Type the missing word or phrase..."
                : "Write your answer here (2-4 sentences)..."
            }
            rows={question.type === "fill" ? 2 : 4}
            className={`w-full px-4 py-3 bg-[#141414] rounded-xl text-[13px] text-white placeholder:text-[#444] border outline-none resize-none transition-all ${
              revealed
                ? evalResult?.isCorrect
                  ? "border-[#4ADE80]/40"
                  : "border-[#F87171]/40"
                : "border-white/[0.06] focus:border-brand/40"
            } disabled:opacity-70`}
          />
          {/* Show correct answer after reveal */}
          {revealed && !evalResult?.isCorrect && (
            <div className="px-4 py-3 bg-[#4ADE80]/[0.05] rounded-xl border border-[#4ADE80]/20">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#4ADE80] mb-1">Model Answer</p>
              <p className="text-[13px] text-[#4ADE80]/80 leading-relaxed">{question.correct}</p>
            </div>
          )}
        </div>
      )}

      {/* Evaluation result for short/fill */}
      {revealed && evalResult && isTextType && (
        <div className="mt-4 flex flex-col gap-3">
          {/* Score */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[#141414] rounded-xl border border-white/[0.06]">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-[13px] font-bold shrink-0"
              style={{
                background: evalResult.score >= 70 ? "rgba(74,222,128,0.1)" : evalResult.score >= 50 ? "rgba(251,191,36,0.1)" : "rgba(248,113,113,0.1)",
                color:      evalResult.score >= 70 ? "#4ADE80" : evalResult.score >= 50 ? "#FBBF24" : "#F87171",
              }}
            >
              {evalResult.score}
            </div>
            <div>
              <p className="text-[12px] font-semibold text-white">
                {evalResult.isCorrect ? "Correct" : evalResult.score >= 50 ? "Partially Correct" : "Incorrect"}
              </p>
              <p className="text-[11px] text-secondary-text mt-0.5">{evalResult.conceptualFeedback}</p>
            </div>
          </div>

          {/* Missing points */}
          {evalResult.missingPoints?.length > 0 && (
            <div className="px-4 py-3 bg-[#FBBF24]/[0.05] rounded-xl border border-[#FBBF24]/15">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#FBBF24] mb-2">Missing Points</p>
              <div className="flex flex-col gap-1">
                {evalResult.missingPoints.map((p, i) => (
                  <p key={i} className="text-[12px] text-[#FBBF24]/80 flex items-start gap-2">
                    <span className="shrink-0 mt-0.5">·</span>{p}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Grammar issues */}
          {evalResult.grammarIssues?.length > 0 && (
            <div className="px-4 py-3 bg-white/[0.03] rounded-xl border border-white/[0.06]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#888] mb-2">
                Language Feedback ({evalResult.grammarIssues.length} issue{evalResult.grammarIssues.length !== 1 ? "s" : ""})
              </p>
              <div className="flex flex-col gap-2">
                {evalResult.grammarIssues.map((g, i) => (
                  <div key={i} className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] text-[#F87171] line-through">{g.original}</span>
                      <span className="text-[10px] text-[#555]">→</span>
                      <span className="text-[11px] text-[#4ADE80]">{g.correction}</span>
                      <span className="text-[9px] font-bold text-[#555] bg-white/[0.04] px-1.5 py-0.5 rounded capitalize">{g.type}</span>
                    </div>
                    <p className="text-[10px] text-[#555] pl-0">{g.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Explanation for MCQ/TF */}
      {revealed && !isTextType && (
        <div className="mt-5">
          <ExplanationBlock
            explanation={question.explanation}
            source={question.source}
            concept={question.concept}
          />
        </div>
      )}

      {/* Footer nav */}
      <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/[0.06]">
        <div />

        {!revealed ? (
          <div className="flex items-center gap-3">
            <button
              onClick={onSkip}
              className="text-[11px] text-[#444] hover:text-[#888] underline transition-colors"
            >
              Skip
            </button>
            <button
              onClick={onSubmit}
              disabled={!canSubmit || evaluating}
              className={`flex items-center gap-2 px-5 py-2.5 bg-brand text-white text-[13px] font-bold rounded-xl transition-all ${
                !canSubmit || evaluating ? "opacity-40 cursor-not-allowed" : "hover:brightness-110"
              }`}
            >
              {evaluating ? (
                <><RiLoader4Line className="text-[14px] animate-spin" /> Evaluating...</>
              ) : (
                <>Submit <RiArrowRightLine className="text-[13px]" /></>
              )}
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