import ResultsHeader    from "./results/ResultsHeader"
import ConceptBreakdown from "./results/ConceptBreakdown"
import MistakeReview    from "./results/MistakeReview"
import MasteryDelta     from "./results/MasteryDelta"
import ResultsActions   from "./results/ResultsActions"

export default function QuizResults({ resultsData, onRestart }) {
  const { summary, masteryDeltas, answers, questions } = resultsData

  return (
    <div className="w-full flex flex-col gap-5">
      <ResultsHeader summary={summary} />
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5">
        <div className="flex flex-col gap-5">
          <ConceptBreakdown answers={answers} questions={questions} />
          <MistakeReview answers={answers} questions={questions} />
          <MasteryDelta masteryDeltas={masteryDeltas} questions={questions} />
        </div>
        <div>
          <ResultsActions onRestart={onRestart} masteryDeltas={masteryDeltas} />
        </div>
      </div>
    </div>
  )
}