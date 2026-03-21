"use client"
import { useState } from "react"
import PageHeader        from "@/components/dashboard/courses/PageHeader"
import CourseInfoCard    from "@/components/dashboard/courses/CourseInfoCard"
import UnitsManager      from "@/components/dashboard/courses/UnitsManager"
import UploadArea        from "@/components/dashboard/courses/UploadArea"
import ProcessingQueue   from "@/components/dashboard/courses/ProcessingQueue"
import ProcessingSummary from "@/components/dashboard/courses/right-panel/ProcessingSummary"
import ReadinessChecklist from "@/components/dashboard/courses/right-panel/ReadinessChecklist"
import FormatsInfo       from "@/components/dashboard/courses/right-panel/FormatsInfo"

export default function CoursesPage() {
  const [published, setPublished] = useState(false)

  return (
    <div className="max-w-[1320px] mx-auto py-6">
      <PageHeader published={published} onPublish={() => setPublished(true)} />

      <div className="grid grid-cols-12 gap-5">

        {/* Left column */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-5">
          <CourseInfoCard />
          <UnitsManager />
          <UploadArea />
          <ProcessingQueue />
        </div>

        {/* Right column — sticky */}
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-4">
            <ProcessingSummary />
            <ReadinessChecklist />
            <FormatsInfo />
          </div>
        </div>

      </div>
    </div>
  )
}