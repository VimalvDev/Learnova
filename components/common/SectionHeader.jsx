import React from "react";
import UpText from "../animation/UpText";
import FadeIn from "../animation/FadeIn";

const SectionHeader = ({ num, heading = "", para = "" }) => {
  return (
    <div className="md:grid md:grid-cols-12 items-start flex  gap-8 mb-20">

      <div className="flex items-center col-span-3 gap-4 mb-4">
        <div className="w-[.1em] h-8 bg-brand"></div>
        <FadeIn direction="right" >

        <span className="text-secondary text-xl">{num}</span>
        </FadeIn>
      </div>

      <div className="heading_section  col-span-9 md:grid grid-cols-12  ">
        <div className="col-span-9  ">
          <UpText delay={0.5} duration={1} splitType="words">
            <h2 className=" text-para text-[clamp(1.2rem,3vw,3rem)] leading-[1.2em] md:pr-[9vw] text-secondary capitalize font-semibold col-span-3 ">
              {heading}
            </h2>
          </UpText>
        </div>

        <div className="col-span-3">
          <FadeIn stagger staggerMax={1} >
            <div className="paragraph h-full w-full flex  justify-end ">
              <p className="text-[clamp(1rem,1vw,1rem)] text-[#888] capitalize  leading-relaxed  pt-2">
                {para}
              </p>
            </div>
          </FadeIn>
        </div>
      </div>

    </div>
  );
};

export default SectionHeader;
