import { MdArrowOutward } from "react-icons/md";
import { TbGridDots } from "react-icons/tb";
import Tags from "@/components/home/features/Tags";

export default function FeatureCard({
  num,
  label,
  title,
  desc,
  tags,
  chart,
  colSpan = "md:col-span-4",
  minHeight = "min-h-[520px]",
  extra = null,
}) {
  return (
    <div
      className={`${colSpan} bg-card border border-white/6 rounded-2xl overflow-hidden relative flex flex-col ${minHeight} hover:border-white/12 transition-all duration-300`}
    >
      <div className="absolute top-4 right-4 opacity-10 z-0">
        <TbGridDots className="text-white text-2xl" />
      </div>{" "}
      <div className="p-[1.8em] flex flex-col h-full gap-4 relative z-10">
        {extra}

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-4">
            {label && (
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand">
                {label}
              </span>
            )}
            <span className="block text-[11px] font-bold uppercase tracking-widest text-brand mt-0.5">
              {num}
            </span>
            <h3 className="text-[clamp(1rem,1.8vw,1.4rem)] font-bold text-white mt-1 leading-tight">
              {title}
            </h3>
              <p className="text-xs text-bleed mt-1.5 leading-relaxed">
              {desc}
            </p>
          </div>
            <span className="text-[clamp(2rem,4vw,3.5rem)] font-black text-white/5 leading-none select-none shrink-0">
            {num}
          </span>
        </div>

        {/* Chart */}
        <div className="flex-1 w-full">{chart}</div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-[1em] border-t border-white/6">
          <Tags tags={tags} />
          <MdArrowOutward />
        </div>
      </div>
    </div>
  );
}
