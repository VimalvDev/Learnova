// components/home/features/Tags.jsx
export default function Tags({ tags }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag) => (
        <span key={tag} className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border bg-white/[0.04] border-white/[0.06] text-[#555]">
          {tag}
        </span>
      ))}
    </div>
  )
}