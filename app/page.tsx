import Navbar from "@/components/common/Navbar";
import Hero from "@/components/home/hero/Hero";
import HowItWorks from "@/components/home/howitworks/HowItWorks";

import WeaknessDetection from "@/components/WeaknessDetection";
import RagShowcase from "@/components/RagShowcase";
import Analytics from "@/components/Analytics";
import KnowledgeGraph from "@/components/KnowledgeGraph";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/CTA";

import Manifesto from "@/components/home/Manifesto";
import Features from "@/components/home/features/Features";
import Footer from "@/components/common/Footer";
import MasteryScoring from "@/components/home/deep-dives/MasteryScoring";
import WeaknessIntelligence from "@/components/home/deep-dives/WeaknessIntelligence";
import AskFromNotes from "@/components/home/deep-dives/AskFromNotes";
import AdaptiveQuiz from "@/components/home/deep-dives/AdaptiveQuiz";
import RevisionScheduler from "@/components/home/deep-dives/RevisionScheduler";
import PerformanceInsights from "@/components/home/deep-dives/PerformanceInghts";

export default function Page() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />

      <main className="md:px-[3em] px-[1em]" >
        <Hero />
        <Manifesto />
        <Features />
        <HowItWorks />
        <MasteryScoring/>
        <WeaknessIntelligence/>
        <AskFromNotes/>
        <AdaptiveQuiz/>
        <RevisionScheduler/>
        <PerformanceInsights/>
        {/* <Pricing /> */}
        <FAQ />
        {/* <FinalCTA /> */}
      </main>
      <Footer />
    </div>
  );
}
