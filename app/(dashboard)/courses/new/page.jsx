"use client"
import { useState } from "react"
import PageHeader         from "@/components/dashboard/courses/PageHeader"
import CourseInfoCard     from "@/components/dashboard/courses/CourseInfoCard"
import UnitsManager       from "@/components/dashboard/courses/UnitsManager"
import UploadArea         from "@/components/dashboard/courses/UploadArea"
import ProcessingQueue    from "@/components/dashboard/courses/ProcessingQueue"
import ProcessingSummary  from "@/components/dashboard/courses/right-panel/ProcessingSummary"
import ReadinessChecklist from "@/components/dashboard/courses/right-panel/ReadinessChecklist"
import FormatsInfo        from "@/components/dashboard/courses/right-panel/FormatsInfo"

export default function NewCoursePage() {
  const [published, setPublished] = useState(false)

  return (
    <div>
      <PageHeader published={published} onPublish={() => setPublished(true)} />
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-5">
          <UploadArea />
          <ProcessingQueue />
          <CourseInfoCard />
          <UnitsManager />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <div className="md:sticky md:top-4 flex flex-col gap-4">
            <ProcessingSummary />
            <ReadinessChecklist />
            <FormatsInfo />
          </div>
        </div>
      </div>
    </div>
  )
}