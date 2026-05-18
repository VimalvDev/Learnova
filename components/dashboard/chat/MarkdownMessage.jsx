"use client"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function MarkdownMessage({ content }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => <h1 className="text-[16px] font-bold text-white mt-4 mb-2 first:mt-0">{children}</h1>,
        h2: ({ children }) => <h2 className="text-[15px] font-bold text-white mt-4 mb-2 first:mt-0">{children}</h2>,
        h3: ({ children }) => <h3 className="text-[14px] font-semibold text-white mt-3 mb-1.5 first:mt-0">{children}</h3>,
        h4: ({ children }) => <h4 className="text-[13px] font-semibold text-white/90 mt-2 mb-1">{children}</h4>,
        p:  ({ children }) => <p  className="text-[13px] text-white/90 leading-[1.75] mb-3 last:mb-0">{children}</p>,
        strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
        em:     ({ children }) => <em     className="italic text-white/80">{children}</em>,
        ul: ({ children }) => <ul className="flex flex-col gap-1 mb-3 pl-1">{children}</ul>,
        ol: ({ children }) => <ol className="flex flex-col gap-1 mb-3 pl-1 list-decimal list-inside">{children}</ol>,
        li: ({ children }) => (
          <li className="flex items-start gap-2 text-[13px] text-white/80 leading-relaxed">
            <span className="text-brand mt-1.5 shrink-0 text-[8px]">●</span>
            <span>{children}</span>
          </li>
        ),
        code: ({ inline, children }) =>
          inline ? (
            <code className="px-1.5 py-0.5 bg-white/[0.08] text-brand text-[12px] rounded font-mono">{children}</code>
          ) : (
            <pre className="bg-[#111] rounded-xl p-4 overflow-x-auto mb-3">
              <code className="text-[12px] text-white/80 font-mono leading-relaxed">{children}</code>
            </pre>
          ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-brand/40 pl-4 my-3 text-[13px] text-white/60 italic">{children}</blockquote>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto mb-3">
            <table className="w-full text-[12px] border-collapse">{children}</table>
          </div>
        ),
        th: ({ children }) => <th className="text-left px-3 py-2 bg-white/[0.06] text-white font-semibold border-b border-white/[0.08]">{children}</th>,
        td: ({ children }) => <td className="px-3 py-2 text-white/80 border-b border-white/[0.04]">{children}</td>,
        a:  ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">{children}</a>,
        hr: () => <hr className="border-white/[0.08] my-4" />,
      }}
    >
      {content}
    </Markdown>
  )
}