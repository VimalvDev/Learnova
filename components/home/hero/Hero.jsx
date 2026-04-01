
import UpText from "@/components/animation/UpText.tsx";
import Link from "next/link";


export default function Hero() {
  return (


      <section id="home" className="min-h-screen pt-[10em] pl-[5em] md:mb-[5em]  ">
        <div className=" z-20 flex flex-col w-full h-full  items-center gap-[2em] relative">
          <div className="h-full w-full ">
            <UpText duration={1} delay={0.5} splitType="words">
              <h1 className="text-[clamp(2.488rem,7.875vw,7.875rem)] uppercase leading-[1em] inline-block font-semibold mb-8 md:pr-[.6em] text-white">
                — The smarter way to{" "}
                <span className="text-brand highlighted-word">learn</span>,{" "}
                <span className="text-brand highlighted-word ">retain</span>,
                and{" "}
                <span className="text-brand highlighted-word ">master </span>
                anything
              </h1>
            </UpText>

            <div className=" flex md:flex-row flex-col h-full w-full  md:items-center md:mb-[3em] tracking-wide  ">
              <p className="text-xl text-bleed md:w-[60%]  ">
                Upload your lectures, textbooks, or notes. We transform your
                materials into a structured path toward total mastery with
                AI-driven insights.
              </p>

              <div className="hidden md:inline-block w-[6em] h-[.1em] bg-bleed "></div>

              <div className="hero_btn md:mr-[10em] md:mt-0 mt-[6em] md:ml-[2em] ">
                <Link href="/signup" className="bg-brand text-white px-5 py-3 rounded-xl text-lg font-bold hover:brightness-110 transition-all">
                  Learn now
                </Link>
              </div>
            </div>
          </div>

          {/* <div className="hero_image w-full hidden md:block  ">
            <HeroImage />
          </div> */}
        </div>
      </section>


  );
}
