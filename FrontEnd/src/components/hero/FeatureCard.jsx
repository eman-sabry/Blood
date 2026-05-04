const FeatureCard = ({ icon, title, desc }) => (
  <div className="flex items-center gap-4 bg-white/10 border border-white/15 rounded-2xl px-5 py-5 hover:bg-white/15 hover:translate-x-1 transition-all duration-200 cursor-default">
    <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-white text-lg font-medium mb-0.5">{title}</p>
      <p className="text-white/55 text-md">{desc}</p>
    </div>
  </div>
);

export default FeatureCard;
