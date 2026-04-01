import Navbar from "@/components/common/Navbar";
import Hero from "@/components/home/hero/Hero";

import FAQ from "@/components/home/FAQ";
import Manifesto from "@/components/home/Manifesto";
import Features from "@/components/home/features/Features";
import Footer from "@/components/common/Footer";
import MasteryScoring from "@/components/home/deep-dives/MasteryScoring";
import WeaknessIntelligence from "@/components/home/deep-dives/WeaknessIntelligence";
import AskFromNotes from "@/components/home/deep-dives/AskFromNotes";
import AdaptiveQuiz from "@/components/home/deep-dives/AdaptiveQuiz";
import RevisionScheduler from "@/components/home/deep-dives/RevisionScheduler";
import PerformanceInsights from "@/components/home/deep-dives/PerformanceInghts";
import HeroBackground from "@/components/home/hero/HeroBackground";
import HowItWorks from "@/components/home/howitworks/HowItWorks";
import LenisProvider from "@/components/common/LenisProvider";

export default function Page() {
  return (
            <LenisProvider>

            

    <div className="overflow-x-hidden">
      <Navbar />
      <HeroBackground/>
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
        {/* <FinalCTA /> */}
      </main>
      <Footer />
    </div>
    </LenisProvider>
  );
}
