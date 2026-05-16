import { MdArrowOutward } from "react-icons/md";
import { TbGridDots } from "react-icons/tb";
import Tags from "@/components/home/features/Tags";
import { ParticleCard } from "@/components/home/features/MagicBentoEffects";

export default function FeatureCard({
  num, label, title, desc, tags,
  chart, colSpan = "md:col-span-4",
  minHeight = "min-h-[520px]",
  extra = null, link,
  glowColor = "250, 110, 67",
}) {
  return (
    <ParticleCard
      className={`${colSpan} card card--border-glow bg-card rounded-xl relative flex flex-col ${minHeight}`}
      glowColor={glowColor}
      particleCount={8}
      enableTilt={false}
      enableMagnetism={false}
      clickEffect={true}
      style={{
        "--glow-x": "50%",
        "--glow-y": "50%",
        "--glow-intensity": "0",
        "--glow-radius": "200px",
      }}
    >
      <div className="absolute top-4 right-4 opacity-10 z-0">
        <TbGridDots className="text-white text-2xl" />
      </div>

      <div className="px-[2em] pt-[2em] pb-[1em] flex flex-col h-full gap-4 relative z-10">
        {extra}

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
            <p className="text-xs text-bleed mt-1.5 leading-relaxed">{desc}</p>
          </div>
          <span className="text-[clamp(2rem,4vw,3.5rem)] font-black text-white/5 leading-none select-none shrink-0">
            {num}
          </span>
        </div>

        <div className="flex-1 w-full">{chart}</div>

        <div className="flex items-center justify-between pt-[1em] border-t border-white/[0.06]">
          <Tags tags={tags} />
          <a
            href={link}
            className="w-[2.5em] h-[2.5em] rounded-xl bg-brand flex items-center justify-center cursor-pointer hover:brightness-110 transition-all hover:scale-105"
          >
            <MdArrowOutward className="text-black text-lg" />
          </a>
        </div>
      </div>
    </ParticleCard>
  );
}