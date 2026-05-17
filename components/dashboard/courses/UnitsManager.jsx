"use client"
import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import { RiArrowDownSLine, RiFileTextLine, RiCheckLine, RiAlertLine } from "react-icons/ri"

export default function UnitsManager({ courseId }) {
  const [units,   setUnits]   = useState([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (courseId) fetchUnits()
  }, [courseId])

  async function fetchUnits() {
    setLoading(true)
    const { data: unitsData } = await supabase
      .from("units")
      .select("*")
      .eq("course_id", courseId)
      .order("order_index")

    if (!unitsData) { setLoading(false); return }

    // Fetch documents for each unit
    const { data: docsData } = await supabase
      .from("documents")
      .select("id, file_name, file_type, word_count, chunk_count, status")
      .eq("course_id", courseId)

    const enriched = unitsData.map((u) => ({
      ...u,
      expanded: true,
      documents: docsData?.filter((d) => d.unit_id === u.id) ?? [],
    }))

    setUnits(enriched)
    setLoading(false)
  }

  function toggleUnit(id) {
    setUnits((prev) => prev.map((u) => u.id === id ? { ...u, expanded: !u.expanded } : u))
  }

  if (loading) return (
    <div className="bg-[#171717] rounded-2xl p-6 animate-pulse">
      <div className="h-4 w-40 bg-white/[0.06] rounded mb-3" />
      <div className="h-12 bg-white/[0.06] rounded-xl" />
    </div>
  )

  if (units.length === 0) return null

  return (
    <div className="bg-[#171717] rounded-2xl p-6">
      <div className="mb-5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand/80 block mb-1">
          Course Structure
        </span>
        <h2 className="text-[17px] font-semibold text-white/90">Units & Modules</h2>
        <p className="text-[12px] text-[#666] mt-0.5">
          Units are created automatically when you upload documents.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {units.map((unit, index) => (
          <div key={unit.id} className="bg-[#111] rounded-2xl overflow-hidden">

            {/* Unit header */}
            <div
              className="flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-white/[0.02] transition-colors"
              onClick={() => toggleUnit(unit.id)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-brand">Unit {index + 1}</span>
                  <span className="text-tertiary-text text-[10px]">·</span>
                  <span className="text-[13px] font-medium text-white">{unit.unit_name}</span>
                </div>
                <p className="text-[11px] text-secondary-text mt-0.5">
                  {unit.documents.length} {unit.documents.length === 1 ? "file" : "files"}
                </p>
              </div>
              <RiArrowDownSLine
                className="text-[#444] text-[18px] transition-transform duration-200"
                style={{ transform: unit.expanded ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </div>

            {/* Expanded — document list */}
            {unit.expanded && (
              <div className="px-4 pb-4 pt-1 border-t border-white/[0.04]">
                {unit.documents.length === 0 ? (
                  <p className="text-[12px] text-secondary-text py-4 text-center">
                    No documents in this unit yet.
                  </p>
                ) : (
                  <div className="flex flex-col gap-2 mt-2">
                    {unit.documents.map((doc) => (
                      <DocRow key={doc.id} doc={doc} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-[11px] text-[#444] mt-4">
        Upload more documents above to add files to existing or new units.
      </p>
    </div>
  )
}

function DocRow({ doc }) {
  const isComplete = doc.status === "complete"
  const isError    = doc.status === "error"

  return (
    <div className="flex items-center gap-3 px-3 py-2.5 bg-[#171717] rounded-xl">
      <div className="w-7 h-7 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
        <RiFileTextLine className="text-[12px] text-white/60" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-medium text-white truncate">{doc.file_name}</p>
        <p className="text-[10px] text-secondary-text mt-0.5">
          {doc.file_type?.toUpperCase()}
          {doc.word_count  > 0 && ` · ${doc.word_count.toLocaleString()} words`}
          {doc.chunk_count > 0 && ` · ${doc.chunk_count} chunks`}
        </p>
      </div>
      <div className="shrink-0">
        {isComplete && <RiCheckLine className="text-[#4ADE80] text-[15px]" />}
        {isError    && <RiAlertLine className="text-[#F87171] text-[15px]" />}
      </div>
    </div>
  )
}