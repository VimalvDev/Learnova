import UpText from "../animation/UpText";
const Heading = ({ text }) => {
  return (
    <UpText duration={1.5} >
      <h2 className="text_heading text-bleed  capitalize text-[clamp(2.986rem,9.475vw,9.875rem)]  font-semibold tracking-tighter mb-[.2em] leading-[1.28em] ">
        {text}
      </h2>
    </UpText>
  );
};

export default Heading;
