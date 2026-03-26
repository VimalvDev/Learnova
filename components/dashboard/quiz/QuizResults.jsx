import ResultsHeader    from "./results/ResultsHeader"
import ConceptBreakdown from "./results/ConceptBreakdown"
import MistakeReview    from "./results/MistakeReview"
import AdaptiveReport   from "./results/AdaptiveReport"
import MasteryDelta     from "./results/MasteryDelta"
import ResultsActions   from "./results/ResultsActions"

export default function QuizResults({ onRestart }) {
  return (
    <div className="w-full flex flex-col gap-5">
      <ResultsHeader />
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5">
        <div className="flex flex-col gap-5">
          <ConceptBreakdown />
          <MistakeReview />
          <AdaptiveReport />
          <MasteryDelta />
        </div>
        <div>
          <ResultsActions onRestart={onRestart} />
        </div>
      </div>
    </div>
  )
}