"use client"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import PageHeader     from "@/components/dashboard/courses/PageHeader"
import CourseInfoCard from "@/components/dashboard/courses/CourseInfoCard"
import UnitsManager   from "@/components/dashboard/courses/UnitsManager"
import UploadArea     from "@/components/dashboard/courses/UploadArea"

export default function NewCoursePage() {
  const [published,      setPublished]      = useState(false)
  const [courseId,       setCourseId]       = useState(null)
  const [saving,         setSaving]         = useState(false)
  const [uploadCount,    setUploadCount]    = useState(0)
  const router   = useRouter()
  const supabase = createClient()

  async function handlePublish() {
    if (!courseId) return
    const { error } = await supabase
      .from("courses")
      .update({ status: "published" })
      .eq("id", courseId)
    if (!error) { setPublished(true); router.push("/courses") }
  }

  function handleUploadComplete() {
    // incrementing forces UnitsManager to re-fetch
    setUploadCount((n) => n + 1)
  }

  return (
    <div>
      <PageHeader published={published} onPublish={handlePublish} />
      <div className="flex flex-col gap-5">

        {/* Step 1 — fill course info first */}
        <CourseInfoCard
          onSaved={setCourseId}
          saving={saving}
          setSaving={setSaving}
        />

        {/* Step 2 — upload documents after course saved */}
        {courseId && (
          <UploadArea
            courseId={courseId}
            onUploadComplete={handleUploadComplete}
          />
        )}

        {/* Step 3 — units appear after first upload */}
        {courseId && uploadCount > 0 && (
          <UnitsManager
            key={uploadCount}
            courseId={courseId}
          />
        )}

      </div>
    </div>
  )
}