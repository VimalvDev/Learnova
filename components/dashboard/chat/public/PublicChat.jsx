"use client"
import { useState } from "react"
import PublicInput          from "./PublicInput"
import GenerationTypeCards  from "./GenerationTypeCards"
import RecentExplorations   from "./RecentExplorations"
import PublicAnswer         from "./PublicAnswer"
import PublicQuizPreview    from "./PublicQuizPreview"
import EmptyState           from "./EmptyState"
import TopicKnowledgeCard   from "./right-panel/TopicKnowledgeCard"
import ModeComparison       from "./right-panel/ModeComparison"
import CourseIntegration    from "./right-panel/CourseIntegration"
import ExplorationHistory   from "./right-panel/ExplorationHistory"

export default function PublicChat({ onSwitchPrivate }) {
  const [query,    setQuery]    = useState("")
  const [genType,  setGenType]  = useState("explanation") // explanation | quiz | summary
  const [answer,   setAnswer]   = useState(null)  // null = no answer yet
  const [loading,  setLoading]  = useState(false)
  const [topic,    setTopic]    = useState(null)

  const handleGenerate = (q = query, type = genType) => {
    if (!q.trim()) return
    setLoading(true)
    setAnswer(null)
    setTopic(null)
    setTimeout(() => {
      setTopic(q.trim())
      setAnswer({ type, query: q.trim() })
      setLoading(false)
    }, 2200)
  }

  const handleTopicPrefill = (t) => {
    setQuery(t)
    handleGenerate(t, genType)
  }

  return (
    <div className="grid grid-cols-[1fr_300px] flex-1 min-h-0 overflow-hidden">

      {/* Center workspace */}
      <div className="flex flex-col h-full overflow-y-auto px-6 py-5 gap-5">

        {/* Input card */}
        <div className="bg-card rounded-2xl p-5">
          <p className="text-[9px] font-bold uppercase tracking-widest text-brand/70 mb-1">
            Knowledge Exploration
          </p>
          <h2 className="text-[clamp(15px,1.8vw,18px)] font-semibold text-white mb-1">
            Ask About Any Topic
          </h2>
          <p className="text-[12px] text-tertiary-text mb-4">
            Learnova generates structured academic explanations. You can integrate any answer into your course.
          </p>

          <PublicInput
            value={query}
            onChange={setQuery}
            onGenerate={() => handleGenerate()}
            genType={genType}
          />
        </div>

        {/* Generation type cards */}
        <GenerationTypeCards value={genType} onChange={setGenType} />

        {/* States */}
        {!answer && !loading && (
          <>
            <RecentExplorations onSelect={handleTopicPrefill} />
            <EmptyState onSelect={handleTopicPrefill} />
          </>
        )}

        {loading && <LoadingState />}

        {answer && !loading && (
          <>
            {answer.type === "quiz"
              ? <PublicQuizPreview topic={answer.query} onSwitchPrivate={onSwitchPrivate} />
              : <PublicAnswer topic={answer.query} type={answer.type} onFollowUp={handleTopicPrefill} />
            }
          </>
        )}
      </div>

      {/* Right panel */}
      <div className="flex flex-col h-full overflow-y-auto bg-card-dark border-l border-(--color-card) gap-0 divide-y divide-(--color-card)">
        <TopicKnowledgeCard topic={topic} />
        <ModeComparison onSwitchPrivate={onSwitchPrivate} />
        <CourseIntegration topic={topic} />
        <ExplorationHistory onSelect={handleTopicPrefill} />
      </div>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="bg-card rounded-2xl p-12 flex flex-col items-center text-center">
      <span className="text-brand text-[28px] animate-pulse mb-4">◈</span>
      <h3 className="text-[15px] font-semibold text-white mb-2">Generating structured explanation...</h3>
      <p className="text-[12px] text-tertiary-text mb-4">Structuring key concepts...</p>
      <div className="w-48 h-1 bg-card-dark rounded-full overflow-hidden">
        <div className="h-full bg-(--color-brand) rounded-full animate-pulse w-3/4" />
      </div>
    </div>
  )
}