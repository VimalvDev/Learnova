"use client"
import { useState, useEffect } from "react"
import { RiPauseLine, RiCloseLine } from "react-icons/ri"
import QuizProgressBar    from "./active/QuizProgressBar"
import AdaptiveStatusCard from "./active/AdaptiveStatusCard"
import QuestionCard       from "./active/QuestionCard"

const questions = [
  {
    id: 1, concept: "Normalization", difficulty: "Medium", type: "mcq",
    text: "Which of the following conditions must be satisfied for a relation to be in Second Normal Form (2NF)?",
    options: [
      { id: "a", text: "Every non-prime attribute is fully functionally dependent on the entire primary key." },
      { id: "b", text: "Eliminate all transitive dependencies from non-prime attributes." },
      { id: "c", text: "Every attribute must be atomic and there are no repeating groups." },
      { id: "d", text: "All candidate keys must be identified and recorded." },
    ],
    correct: "a",
    explanation: "2NF builds on 1NF by eliminating partial dependencies. A partial dependency occurs when a non-prime attribute depends on only part of a composite primary key, not the whole key.",
    source: "DBMS_Notes.pdf · Chapter 4 · Page 67",
    mastery: 42,
  },
  {
    id: 2, concept: "ER Model", difficulty: "Easy", type: "truefalse",
    text: "An entity can participate in more than one relationship type in an ER diagram.",
    correct: "true",
    explanation: "In ER modeling, entities can participate in multiple relationship types simultaneously.",
    source: "ER_Diagrams_Notes.docx · Page 8",
    mastery: 79,
  },
]

export default function QuizActive({ onFinish }) {
  const [qIndex,   setQIndex]   = useState(0)
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [elapsed,  setElapsed]  = useState(0)
  const [answers,  setAnswers]  = useState([])

  const total = questions.length
  const q     = questions[qIndex]

  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(t)
  }, [])

  const mm         = String(Math.floor(elapsed / 60)).padStart(2, "0")
  const ss         = String(elapsed % 60).padStart(2, "0")
  const timerColor = elapsed > 90 ? "text-[#F87171]" : elapsed > 60 ? "text-[#FBBF24]" : "text-[#888]"

  const handleSubmit = () => {
    if (!selected) return
    setRevealed(true)
    setAnswers((p) => [...p, { qId: q.id, selected, correct: q.correct }])
  }

  const handleNext = () => {
    if (qIndex + 1 >= total) { onFinish(); return }
    setQIndex((i) => i + 1)
    setSelected(null)
    setRevealed(false)
  }

  const handlePrev = () => {
    if (qIndex === 0) return
    setQIndex((i) => i - 1)
    setSelected(null)
    setRevealed(false)
  }

  return (
    <div className="w-full">

      {/* Session bar — full width */}
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/6">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[13px] font-semibold text-white">DBMS Quiz</span>
          <span className="text-tertiary-text">·</span>
          <span className="text-[12px] text-secondary-text">Question {qIndex + 1} of {total}</span>
          <span className="text-tertiary-text">·</span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-brand bg-brand/10 px-2 py-0.5 rounded-full">
            Auto Mode
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-[13px] font-semibold tabular-nums ${timerColor}`}>
            ⏱ {mm}:{ss}
          </span>
          <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-card text-secondary-text hover:text-white border border-white/6 transition-colors">
            <RiPauseLine className="text-[14px]" />
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[#F87171] text-[11px] border border-[#F87171]/20 hover:border-[#F87171]/50 transition-colors">
            <RiCloseLine className="text-[13px]" /> Exit
          </button>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-5">

        {/* Left — question */}
        <div className="flex flex-col gap-4">
          <QuizProgressBar current={qIndex + 1} total={total} answers={answers} questions={questions} />
          <AdaptiveStatusCard qIndex={qIndex} answers={answers} />
          <QuestionCard
            question={q}
            selected={selected}
            onSelect={setSelected}
            revealed={revealed}
            onSubmit={handleSubmit}
            onNext={handleNext}
            onPrev={handlePrev}
            isFirst={qIndex === 0}
            isLast={qIndex + 1 >= total}
          />
        </div>

        {/* Right — session sidebar */}
        <div className="flex flex-col gap-4">

          {/* Progress summary */}
          <div className="bg-card rounded-2xl p-5 border border-white/4">
            <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-4">
              Session Progress
            </p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: "Correct",   value: answers.filter((a) => a.selected === a.correct).length,  color: "text-[#4ADE80]" },
                { label: "Incorrect", value: answers.filter((a) => a.selected !== a.correct).length,  color: "text-[#F87171]" },
                { label: "Remaining", value: total - answers.length,                                  color: "text-white"     },
                { label: "Accuracy",  value: answers.length ? `${Math.round(answers.filter((a) => a.selected === a.correct).length / answers.length * 100)}%` : "—", color: "text-brand" },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-[#141414] rounded-xl px-3 py-2.5 border border-white/4">
                  <p className={`text-[16px] font-bold ${color}`}>{value}</p>
                  <p className="text-[10px] text-[#444] mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Q map */}
          <div className="bg-card rounded-2xl p-5 border border-white/4">
            <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-3">
              Question Map
            </p>
            <div className="flex flex-wrap gap-1.5">
              {questions.map((question, i) => {
                const ans     = answers.find((a) => a.qId === question.id)
                const current = i === qIndex
                return (
                  <div
                    key={question.id}
                    title={`Q${i + 1} · ${question.concept}`}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold border transition-all ${
                      current
                        ? "bg-brand border-brand text-white"
                        : ans
                        ? ans.selected === ans.correct
                          ? "bg-[#4ADE80]/10 border-[#4ADE80]/40 text-[#4ADE80]"
                          : "bg-[#F87171]/10 border-[#F87171]/40 text-[#F87171]"
                        : "bg-[#141414] border-white/6 text-secondary-text"
                    }`}
                  >
                    {i + 1}
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}