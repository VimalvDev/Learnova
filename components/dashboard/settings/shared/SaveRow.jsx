export default function SaveRow({ label = "Save Changes", onSave }) {
  return (
    <div className="flex items-center justify-end gap-3 mt-6 pt-5 border-t border-card-dark">
      <button className="text-[12px] text-secondary-text hover:text-white transition-colors">
        Cancel
      </button>
      <button
        onClick={onSave}
        className="h-9 px-5 bg-(--color-brand) text-white text-[12px] font-bold rounded-xl hover:brightness-110 transition-all"
      >
        {label}
      </button>
    </div>
  )
}