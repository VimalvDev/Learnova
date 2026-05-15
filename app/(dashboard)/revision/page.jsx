import React from "react";
import RevisionHeader from "@/components/dashboard/revision/RevisionHeader";
import RevisionList from "@/components/dashboard/revision/RevisionList";
import RevisionCalendar from "@/components/dashboard/revision/RevisionCalendar";

export default function RevisionPage() {
  return (
    <div className="max-w-330 mx-auto flex flex-col gap-4 py-4">
      <RevisionHeader />
      <RevisionList />
      <RevisionCalendar />
    </div>
  );
}