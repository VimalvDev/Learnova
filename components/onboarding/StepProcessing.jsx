"use client";
import { useEffect, useState } from "react";
import { RiCheckLine } from "react-icons/ri";
import { createClient } from "@/utils/supabase/client";

const steps = [
  { label: "Creating your course structure", duration: 1000 },
  { label: "Configuring adaptive engine", duration: 1200 },
  { label: "Setting up revision scheduler", duration: 1000 },
  { label: "Initialising knowledge base", duration: 1400 },
  { label: "Preparing your dashboard", duration: 800 },
];

export default function StepProcessing({ formData, onComplete }) {
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let idx = 0;

    const saveToSupabase = async () => {
      const supabase = createClient();

      // Get current logged in user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        setError("Not logged in. Please sign in again.");
        return false;
      }

      // Step 1 — Save onboarding data to profiles
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          primary_subject:    formData.primarySubject,
          academic_level:     formData.academicLevel,
          studying_for:       formData.studyingFor,
          confidence_level:   formData.confidenceLevel,
          target_exam_date:   formData.targetDate || null,
          daily_study_hours:  formData.dailyHours,
          onboarding_complete: true,
          updated_at:         new Date().toISOString(),
        })
        .eq("id", user.id);

      if (profileError) {
        console.error("Profile save error:", profileError);
        setError("Failed to save profile.");
        return false;
      }

      // Step 2 — Create course (if course name provided)
      if (formData.courseName) {
        const { data: course, error: courseError } = await supabase
          .from("courses")
          .insert({
            user_id:     user.id,
            course_name: formData.courseName,
            status:      "draft",
          })
          .select()
          .single();

        if (courseError) {
          console.error("Course save error:", courseError);
          setError("Failed to save course.");
          return false;
        }

        // Step 3 — Create unit (if unit name provided)
        if (formData.unitName && course) {
          const { error: unitError } = await supabase
            .from("units")
            .insert({
              user_id:    user.id,
              course_id:  course.id,
              unit_name:  formData.unitName,
              order_index: 0,
            });

          if (unitError) {
            console.error("Unit save error:", unitError);
            setError("Failed to save unit.");
            return false;
          }
        }
      }

      return true;
    };

    const run = async () => {
      // Save to Supabase first
      const success = await saveToSupabase();
      if (!success) return;

      // Run animation steps
      const nextStep = () => {
        if (idx < steps.length) {
          setCurrent(idx);
          setTimeout(() => {
            idx++;
            nextStep();
          }, steps[idx]?.duration ?? 1000);
        } else {
          setDone(true);
          setTimeout(onComplete, 1000);
        }
      };

      nextStep();
    };

    run();
  }, []);

  const progress = done ? 100 : Math.round((current / steps.length) * 100);

  return (
    <div className="max-w-140 flex flex-col items-center text-center pt-8">
      {/* Error state */}
      {error && (
        <div className="w-full mb-6 px-5 py-3 rounded-xl bg-red/10 border border-red/20">
          <p className="text-sm text-red">⚠ {error}</p>
        </div>
      )}

      {/* Animated ring */}
      <div className="relative w-24 h-24 mb-8">
        <svg viewBox="0 0 96 96" className="w-full h-full -rotate-90">
          <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
          <circle
            cx="48" cy="48" r="40" fill="none"
            stroke="var(--color-brand)" strokeWidth="6" strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 40}
            strokeDashoffset={2 * Math.PI * 40 * (1 - progress / 100)}
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {done ? (
            <RiCheckLine className="text-brand text-[28px]" />
          ) : (
            <span className="text-[18px] font-black text-white">{progress}%</span>
          )}
        </div>
      </div>

      <h2 className="text-[28px] font-black text-white mb-2">
        {done ? "All done!" : "Setting things up..."}
      </h2>
      <p className="text-sm text-bleed mb-10">
        {done
          ? "Your learning system is ready. Taking you to the dashboard."
          : "Configuring your personal learning system. This only happens once."}
      </p>

      {/* Steps checklist */}
      <div className="w-full flex flex-col gap-2.5 text-left">
        {steps.map(({ label }, i) => {
          const isComplete = i < current || done;
          const isActive = i === current && !done;
          return (
            <div
              key={label}
              className="flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all"
              style={{
                background: isActive ? "rgba(250,110,67,0.06)" : isComplete ? "rgba(255,255,255,0.02)" : "transparent",
                border: isActive ? "1px solid rgba(250,110,67,0.2)" : "1px solid transparent",
              }}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                isComplete || done ? "bg-[var(--color-card-dark)]" : isActive
                  ? "bg-[color-mix(in_srgb,var(--color-brand)_15%,var(--color-dark))]"
                  : "bg-white/[0.04]"
              } ${isActive && !isComplete ? "border-[1.5px] border-brand" : "border-none"}`}>
                {isComplete || done ? (
                  <RiCheckLine className="text-white text-[11px]" />
                ) : isActive ? (
                  <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                ) : null}
              </div>
              <span className="text-[13px] transition-colors" style={{
                color: isComplete || done ? "#888891" : isActive ? "#fff" : "#333",
              }}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}