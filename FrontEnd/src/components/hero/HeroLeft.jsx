import { Link } from "react-router-dom";
import HeroStats from "./HeroStats";

const HeroLeft = () => (
  <div>
    <LiveTag />
    <HeroTitle />
    <p className="text-lg text-white/70 leading-relaxed mb-7 max-w-sm">
      Join thousands of heroes who donate blood regularly. Your donation can
      save up to three lives and it only takes 30 minutes.
    </p>
    <HeroCTA />
    <HeroStats />
  </div>
);

const LiveTag = () => (
  <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white uppercase tracking-widest mb-5">
    <span className="w-2 h-2 rounded-full bg-red-300  animate-pulse" />
    Saving lives together
  </div>
);

const HeroTitle = () => (
  <h1 className="text-6xl md:text-8xl font-black leading-tight text-white mb-4 font-serif">
    Every Drop
    <br />
    <em className="italic text-red-100">Saves a Life</em>
  </h1>
);

const HeroCTA = () => (
  <div className="flex items-center gap-4 mb-9">
    <Link to="/signup">
      <button className="bg-white text-red-800 font-medium text-lg px-6 py-3 rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all duration-150">
        Register Now
      </button>
    </Link>
  </div>
);

export default HeroLeft;
