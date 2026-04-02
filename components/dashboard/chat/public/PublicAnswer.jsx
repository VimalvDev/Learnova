import AnswerBlock            from "./AnswerBlock"
import FollowUpSuggestions    from "./FollowUpSuggestions"
import {
  RiThumbUpLine, RiThumbDownLine,
  RiFileCopyLine, RiBookmarkLine,
  RiRefreshLine, RiAddLine,
} from "react-icons/ri"

const conceptBlocks = [
  {
    name: "Consistency",
    desc: "Every read receives the most recent write or an error. All nodes see the same data simultaneously.",
    border: "border-l-[#534DE5]/40",
  },
  {
    name: "Availability",
    desc: "Every request receives a response — without guarantee that it contains the most recent write.",
    border: "border-l-[#FBBF24]/40",
  },
  {
    name: "Partition Tolerance",
    desc: "The system continues to operate despite network partitions between nodes.",
    border: "border-l-[#4ADE80]/40",
  },
]

const relatedConcepts = [
  "Distributed Systems", "ACID vs BASE", "Eventual Consistency",
  "Partition Tolerance", "Database Replication", "Consensus Algorithms",
]

const followUps = [
  "How does the CAP theorem apply to modern NoSQL databases?",
  "What is PACELC and how does it extend CAP?",
  "Compare CP vs AP systems with real-world examples.",
]

export default function PublicAnswer({ topic, type, onFollowUp }) {
  return (
    <div className="flex flex-col gap-4">

      {/* Header card */}
      <div className="bg-card rounded-2xl p-6">
        {/* Title row */}
        <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
          <div>
            <h2 className="text-[clamp(18px,2.2vw,22px)] font-bold text-white mb-1">{topic}</h2>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] text-secondary-text bg-card-dark px-2.5 py-1 rounded-lg">
                Computer Science
              </span>
              <span className="text-[10px] text-secondary-text bg-card-dark px-2.5 py-1 rounded-lg">
                Distributed Systems
              </span>
              <span className="text-[10px] text-[#FBBF24] bg-[#FBBF24]/10 px-2.5 py-1 rounded-lg">
                Intermediate
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3B82F6]/[0.08] rounded-xl border border-[#3B82F6]/20 flex-shrink-0">
            <span className="text-[#3B82F6] text-[12px]">🌐</span>
            <span className="text-[11px] text-[#3B82F6] font-medium">Public Mode · Generated 2:44 PM</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 px-3 py-2.5 bg-[#3B82F6]/[0.04] rounded-xl border border-[#3B82F6]/15 mb-5">
          <span className="text-[#3B82F6] text-[13px] flex-shrink-0 mt-0.5">ⓘ</span>
          <p className="text-[11px] text-secondary-text leading-relaxed">
            This answer is generated from AI training data — not from your uploaded documents.
            Verify against authoritative sources before using in exams.
          </p>
        </div>

        {/* Definition */}
        <AnswerBlock label="Definition">
          <p className="text-[13px] text-white leading-[1.75]">
            The CAP Theorem, formulated by Eric Brewer in 2000, states that a distributed data system can guarantee
            at most two of three properties simultaneously: <span className="text-brand font-medium">Consistency</span>,{" "}
            <span className="text-brand font-medium">Availability</span>, and{" "}
            <span className="text-brand font-medium">Partition Tolerance</span>.
          </p>
        </AnswerBlock>

        {/* Key concepts */}
        <AnswerBlock label="Key Concepts">
          <div className="flex flex-col gap-2.5">
            {conceptBlocks.map(({ name, desc, border }) => (
              <div key={name} className={`bg-card-dark rounded-xl p-4 border-l-2 ${border}`}>
                <p className="text-[12px] font-semibold text-white mb-1">{name}</p>
                <p className="text-[12px] text-secondary-text leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </AnswerBlock>

        {/* Explanation */}
        <AnswerBlock label="Explanation">
          <div className="flex flex-col gap-3">
            <p className="text-[13px] text-white leading-[1.75]">
              In practice, network partitions are unavoidable in distributed systems. This means system designers must
              choose between Consistency (<span className="text-[11px] bg-card-dark text-brand px-1.5 py-0.5 rounded-md font-mono">CP systems</span>) or Availability{" "}
              (<span className="text-[11px] bg-card-dark text-brand px-1.5 py-0.5 rounded-md font-mono">AP systems</span>) when a partition occurs.
            </p>
            <p className="text-[13px] text-white leading-[1.75]">
              CP systems — such as <span className="text-[11px] bg-card-dark text-brand px-1.5 py-0.5 rounded-md font-mono">HBase</span> and{" "}
              <span className="text-[11px] bg-card-dark text-brand px-1.5 py-0.5 rounded-md font-mono">Zookeeper</span> — prioritize
              consistency by refusing to respond during partitions. AP systems — such as{" "}
              <span className="text-[11px] bg-card-dark text-brand px-1.5 py-0.5 rounded-md font-mono">Cassandra</span> and{" "}
              <span className="text-[11px] bg-card-dark text-brand px-1.5 py-0.5 rounded-md font-mono">CouchDB</span> — remain available but may return stale data.
            </p>
          </div>
        </AnswerBlock>

        {/* Example */}
        <AnswerBlock label="Example">
          <div className="bg-card-dark rounded-xl p-4 border-l-2 border-l-(--color-brand)/35">
            <p className="text-[12px] text-secondary-text leading-[1.7]">
              Consider a bank database replicated across two servers. If the network partition separates Server A and Server B:
            </p>
            <div className="mt-3 flex flex-col gap-2">
              <p className="text-[12px] text-secondary-text leading-relaxed">
                <span className="text-brand">·</span>{" "}
                <span className="text-white font-medium">CP approach:</span> Both servers stop accepting writes until the partition heals — ensuring no inconsistency.
              </p>
              <p className="text-[12px] text-secondary-text leading-relaxed">
                <span className="text-brand">·</span>{" "}
                <span className="text-white font-medium">AP approach:</span> Both servers continue accepting writes — risking temporary inconsistency that resolves later.
              </p>
            </div>
          </div>
        </AnswerBlock>

        {/* Related concepts */}
        <AnswerBlock label="Related Concepts">
          <div className="flex flex-wrap gap-2">
            {relatedConcepts.map((c) => (
              <button
                key={c}
                onClick={() => onFollowUp(c)}
                className="px-3 py-1.5 bg-card-dark text-[11px] text-secondary-text rounded-lg border border-white/[0.04] hover:border-(--color-brand)/40 hover:text-brand hover:-translate-y-px transition-all"
              >
                {c}
              </button>
            ))}
          </div>
        </AnswerBlock>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-(--color-card-dark) flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-tertiary-text">Was this helpful?</span>
            <button className="text-tertiary-text hover:text-white transition-colors">
              <RiThumbUpLine className="text-[16px]" />
            </button>
            <button className="text-tertiary-text hover:text-white transition-colors">
              <RiThumbDownLine className="text-[16px]" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            {[
              { icon: RiFileCopyLine,  label: "Copy"        },
              { icon: RiBookmarkLine,  label: "Save to Notes"},
              { icon: RiRefreshLine,   label: "Regenerate"  },
            ].map(({ icon: Icon, label }) => (
              <button key={label} className="flex items-center gap-1 text-[11px] text-secondary-text hover:text-brand transition-colors">
                <Icon className="text-[13px]" /> {label}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 h-8 px-3.5 text-[11px] font-semibold text-brand bg-card-dark rounded-xl border border-(--color-brand)/25 hover:border-(--color-brand)/60 transition-all">
            <RiAddLine className="text-[13px]" /> Add to Course Material
          </button>
        </div>
      </div>

      {/* Follow-up */}
      <FollowUpSuggestions suggestions={followUps} onSelect={onFollowUp} />
    </div>
  )
}