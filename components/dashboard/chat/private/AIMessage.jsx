import { RiThumbUpLine, RiThumbDownLine, RiFileCopyLine, RiBookmarkLine, RiExternalLinkLine } from "react-icons/ri"

export default function AIMessage({ message }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 mb-0.5">
        <span className="text-[12px] font-semibold text-brand">Learnova AI</span>
        <span className="text-[10px] text-tertiary-text">{message.time}</span>
      </div>

      <div className="bg-card rounded-xl p-5 border border-(--color-card-dark)">
        <p className="text-[13px] text-white leading-relaxed mb-3 whitespace-pre-line">
          {message.content}
        </p>

        {message.bullets?.length > 0 && (
          <ul className="flex flex-col gap-1.5 mb-3">
            {message.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-[12px] text-secondary-text">
                <span className="text-brand mt-0.5 flex-shrink-0">·</span>
                {b}
              </li>
            ))}
          </ul>
        )}

        {message.sources?.length > 0 && (
          <div className="flex flex-col gap-1.5 mb-4 pt-3 border-t border-(--color-card-dark)">
            {message.sources.map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-[11px] text-tertiary-text">
                <span className="text-brand text-[10px]">📄</span>
                <span>{s.name}</span>
                <span className="text-dark-gray">·</span>
                <span>{s.loc}</span>
              </div>
            ))}
          </div>
        )}

        {message.confidence && (
          <div className="flex items-center gap-3 pt-3 border-t border-(--color-card-dark)">
            <span className="text-[11px] text-tertiary-text">Confidence</span>
            <div className="flex-1 max-w-[120px] h-[3px] bg-card-dark rounded-full overflow-hidden">
              <div
                className="h-full bg-(--color-brand) rounded-full"
                style={{ width: `${message.confidence}%` }}
              />
            </div>
            <span className={`text-[12px] font-semibold ${
              message.confidence >= 80 ? "text-brand"
              : message.confidence >= 60 ? "text-[#FBBF24]"
              : "text-[var(--color-red)]"
            }`}>
              {message.confidence}%
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 px-1">
        {[
          { icon: RiThumbUpLine,    label: null      },
          { icon: RiThumbDownLine,  label: null      },
          { icon: RiFileCopyLine,   label: "Copy"    },
          { icon: RiBookmarkLine,   label: "Save"    },
          { icon: RiExternalLinkLine, label: "Sources" },
        ].map(({ icon: Icon, label }, i) => (
          <button key={i} className="flex items-center gap-1 text-[11px] text-tertiary-text hover:text-white transition-colors">
            <Icon className="text-[13px]" />
            {label && <span>{label}</span>}
          </button>
        ))}
      </div>
    </div>
  )
}