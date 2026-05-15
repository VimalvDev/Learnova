"use client"
import LenisProvider from "@/components/common/LenisProvider";
import Navbar from "@/components/common/Navbar";
import Features from "@/components/home/features/Features";
import Hero from "@/components/home/hero/Hero";
import HeroBackground from "@/components/home/hero/HeroBackground";
import Manifesto from "@/components/home/Manifesto";
import HowItWorks from "@/components/home/howitworks/HowItWorks";
import MasteryScoring from "@/components/home/deep-dives/MasteryScoring";
import WeaknessIntelligence from "@/components/home/deep-dives/WeaknessIntelligence";
import AskFromNotes from "@/components/home/deep-dives/AskFromNotes";
import AdaptiveQuiz from "@/components/home/deep-dives/AdaptiveQuiz";
import RevisionScheduler from "@/components/home/deep-dives/RevisionScheduler";
import PerformanceInsights from "@/components/home/deep-dives/PerformanceInghts";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/common/Footer";

export default function Page() {
  return (
    <LenisProvider>
      <div className="overflow-x-hidden relative z-10">
        <Navbar />
        <HeroBackground />
    
        <Hero />
        <main>
          <Manifesto />
          <Features />
          <HowItWorks />
          <MasteryScoring />
          <WeaknessIntelligence />
          <AskFromNotes />
          <AdaptiveQuiz />
          <RevisionScheduler />
          <PerformanceInsights />
          <FAQ />
        </main>
        <Footer />
      </div>
    </LenisProvider>
  );
}
