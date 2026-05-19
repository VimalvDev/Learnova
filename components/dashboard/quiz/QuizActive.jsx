"use client"
import { useState, useEffect, useRef } from "react"
import { RiCloseLine } from "react-icons/ri"
import QuizProgressBar    from "./active/QuizProgressBar"
import AdaptiveStatusCard from "./active/AdaptiveStatusCard"
import QuestionCard       from "./active/QuestionCard"
import EvaluatingOverlay  from "./EvaluatingOverlay"

export default function QuizActive({ quizData, onFinish }) {
  const { quizId, questions, smarts } = quizData

  const [qIndex,     setQIndex]     = useState(0)
  const [selected,   setSelected]   = useState(null)
  const [textAnswer, setTextAnswer] = useState("")
  const [revealed,   setRevealed]   = useState(false)
  const [elapsed,    setElapsed]    = useState(0)
  const [qElapsed,   setQElapsed]   = useState(0)
  const [answers,    setAnswers]     = useState([])
  const [evaluating, setEvaluating] = useState(false)
  const [evalResult, setEvalResult] = useState(null)
  const [finished,   setFinished]   = useState(false)

  // Use ref to always have latest answers without stale closure
  const answersRef = useRef([])

  const q     = questions[qIndex]
  const total = questions.length
  const isLast = qIndex + 1 >= total

useEffect(() => {
  if (finished || (isLast && revealed)) return
  const t = setInterval(() => {
    setElapsed((e) => e + 1)
    setQElapsed((e) => e + 1)
  }, 1000)
  return () => clearInterval(t)
}, [finished, isLast, revealed])


  useEffect(() => { setQElapsed(0) }, [qIndex])

  const mm         = String(Math.floor(elapsed / 60)).padStart(2, "0")
  const ss         = String(elapsed % 60).padStart(2, "0")
  const timerColor = elapsed > 120 ? "text-[#F87171]" : elapsed > 60 ? "text-[#FBBF24]" : "text-[#888]"

  const isTextType = q?.type === "short" || q?.type === "fill"
  const canSubmit  = isTextType ? textAnswer.trim().length > 0 : !!selected

  const handleSubmit = async () => {
    if (!canSubmit || revealed) return

    const userAnswer = isTextType ? textAnswer.trim() : selected
    setEvaluating(true)

    let newAnswer
    try {
      if (!isTextType) {
        const isCorrect = userAnswer.charAt(0).toUpperCase() === q.correct.charAt(0).toUpperCase()
        newAnswer = {
          questionId: q.id,
          conceptId:  q.conceptId ?? null,
          userAnswer,
          isCorrect,
          score:      isCorrect ? 100 : 0,
          timeTaken:  qElapsed,
        }
        setEvalResult({
          score: isCorrect ? 100 : 0,
          isCorrect,
          conceptualFeedback: q.explanation ?? "",
          grammarIssues: [],
          missingPoints: [],
        })
      } else {
        const res    = await fetch("/api/quiz/evaluate", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({
            questionText:  q.text,
            questionType:  q.type,
            correctAnswer: q.correct,
            userAnswer,
            concept:       q.concept,
            explanation:   q.explanation,
          }),
        })
        const result = await res.json()
        setEvalResult(result)
        newAnswer = {
          questionId: q.id,
          conceptId:  q.conceptId ?? null,
          userAnswer,
          isCorrect:  result.isCorrect,
          score:      result.score,
          timeTaken:  qElapsed,
        }
      }
    } catch {
      newAnswer = {
        questionId: q.id, conceptId: q.conceptId ?? null,
        userAnswer, isCorrect: false, score: 0, timeTaken: qElapsed,
      }
      setEvalResult({
        score: 0, isCorrect: false,
        conceptualFeedback: "Evaluation failed.",
        grammarIssues: [], missingPoints: [],
      })
    } finally {
      setEvaluating(false)
      setRevealed(true)
      // Update both state and ref immediately
      const updated = [...answersRef.current, newAnswer]
      answersRef.current = updated
      setAnswers(updated)
    }
  }

  const handleNext = () => {
    if (qIndex + 1 >= total) {
      // Use ref — guaranteed to have all answers including the last one
      setFinished(true)
      onFinish({ quizId, answers: answersRef.current, timeTakenSeconds: elapsed })
      return
    }
    setQIndex((i) => i + 1)
    setSelected(null)
    setTextAnswer("")
    setRevealed(false)
    setEvalResult(null)
  }

  const handleSkip = () => {
    const skipped = {
      questionId: q.id, conceptId: q.conceptId ?? null,
      userAnswer: "", isCorrect: false, score: 0, timeTaken: qElapsed,
    }
    const updated = [...answersRef.current, skipped]
    answersRef.current = updated
    setAnswers(updated)

    if (qIndex + 1 >= total) {
      setFinished(true)
      onFinish({ quizId, answers: updated, timeTakenSeconds: elapsed })
      return
    }
    setQIndex((i) => i + 1)
    setSelected(null)
    setTextAnswer("")
    setRevealed(false)
    setEvalResult(null)
  }

  const handleEndQuiz = () => {
    setFinished(true)
    onFinish({ quizId, answers: answersRef.current, timeTakenSeconds: elapsed })
  }

  return (
    <div className="w-full">
      {evaluating && <EvaluatingOverlay />}

      {/* Session bar */}
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[13px] font-semibold text-white">Quiz</span>
          <span className="text-tertiary-text">·</span>
          <span className="text-[12px] text-secondary-text">Question {qIndex + 1} of {total}</span>
          <span className="text-tertiary-text">·</span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-brand bg-brand/10 px-2 py-0.5 rounded-full">
            Adaptive Mode
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-[13px] font-semibold tabular-nums ${timerColor}`}>
            ⏱ {mm}:{ss}
          </span>
          <button
            onClick={handleEndQuiz}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[#F87171] text-[11px] border border-[#F87171]/20 hover:border-[#F87171]/50 transition-colors"
          >
            <RiCloseLine className="text-[13px]" /> End Quiz
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-5">
        <div className="flex flex-col gap-4">
          <QuizProgressBar current={qIndex + 1} total={total} answers={answers} questions={questions} />
          <AdaptiveStatusCard answers={answers} />
          <QuestionCard
            question={q}
            selected={selected}
            onSelect={setSelected}
            textAnswer={textAnswer}
            onTextAnswer={setTextAnswer}
            revealed={revealed}
            evaluating={evaluating}
            evalResult={evalResult}
            onSubmit={handleSubmit}
            onNext={handleNext}
            onSkip={handleSkip}
            isFirst={qIndex === 0}
            isLast={isLast}
            canSubmit={canSubmit}
          />
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          <div className="bg-card-dark rounded-2xl p-5 border border-white/[0.04]">
            <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-4">Session Progress</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Correct",   value: answers.filter((a) => a.isCorrect).length,                                           color: "text-[#4ADE80]" },
                { label: "Incorrect", value: answers.filter((a) => !a.isCorrect && a.userAnswer !== "").length,                    color: "text-[#F87171]" },
                { label: "Skipped",   value: answers.filter((a) => a.userAnswer === "").length,                                    color: "text-[#888]"    },
                { label: "Accuracy",  value: answers.filter((a) => a.userAnswer !== "").length
                    ? `${Math.round(answers.filter((a) => a.isCorrect).length / answers.filter((a) => a.userAnswer !== "").length * 100)}%`
                    : "—",
                  color: "text-brand" },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-[#141414] rounded-xl px-3 py-2.5 border border-white/[0.04]">
                  <p className={`text-[16px] font-bold ${color}`}>{value}</p>
                  <p className="text-[10px] text-[#444] mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card-dark rounded-2xl p-5 border border-white/[0.04]">
            <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-3">Question Map</p>
            <div className="flex flex-wrap gap-1.5">
              {questions.map((question, i) => {
                const ans     = answers.find((a) => a.questionId === question.id)
                const current = i === qIndex
                return (
                  <div
                    key={question.id}
                    title={`Q${i + 1} · ${question.concept}`}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold border transition-all ${
                      current
                        ? "bg-brand border-brand text-white"
                        : ans
                        ? ans.userAnswer === ""
                          ? "bg-white/[0.04] border-white/[0.08] text-[#555]"
                          : ans.isCorrect
                          ? "bg-[#4ADE80]/10 border-[#4ADE80]/40 text-[#4ADE80]"
                          : "bg-[#F87171]/10 border-[#F87171]/40 text-[#F87171]"
                        : "bg-[#141414] border-white/[0.06] text-secondary-text"
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