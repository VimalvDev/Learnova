import React from "react";
import TextAnimation from "../animation/TextAnimation";

const Manifesto = () => {
  return (
    <section className="relative md:min-h-screen min-h-[50vh]  w-full z-10 text-white flex items-center justify-center ">
      <div className="manifesto_container h-full w-full  ">
      

        <TextAnimation>
          <div className="  text-[clamp(2.488rem,8vw,8.5rem)] uppercase font-semibold leading-none">
            <div>Stop Re-reading.</div>

            <div>Start Mastering.</div>
            <div className="mt-[.2em]" >Know Exactly What</div>
            <div>You Don't Know.</div>
          </div>
        </TextAnimation>
      </div>
    </section>
  );
};

export default Manifesto;
