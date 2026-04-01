export default function AnswerBlock({ label, children, className = "" }) {
  return (
    <div className={`mb-5 ${className}`}>
      <p className="text-[9px] font-bold uppercase tracking-widest text-(--color-brand)/70 mb-3">
        {label}
      </p>
      {children}
    </div>
  )
}