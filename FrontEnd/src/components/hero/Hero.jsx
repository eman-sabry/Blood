import BgCircles from "./BgCircles";
import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";

const Hero = () => (
  <div className="relative min-h-[100vh] overflow-hidden flex flex-col justify-center bg-gradient-to-r from-red-500 to-pink-500">
    <BgCircles />
    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 px-8 md:px-12 py-12 items-center">
      <HeroLeft />
      <HeroRight />
    </div>
  </div>
);

export default Hero;
