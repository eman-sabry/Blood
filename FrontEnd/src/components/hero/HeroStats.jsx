const STATS = [
  { num: "12K+", label: "Active donors" },
  { num: "340", label: "Hospitals served" },
  { num: "98K", label: "Lives saved" },
];

const HeroStats = () => (
  <div className="flex gap-6 pt-7 border-t border-white/10">
    {STATS.map((s, i) => (
      <div key={s.label} className="flex items-stretch gap-6">
        {i > 0 && <div className="w-px bg-white/15" />}
        <div>
          <p className="text-4xl font-bold text-white leading-none">{s.num}</p>
          <p className="text-md text-white/50 mt-1">{s.label}</p>
        </div>
      </div>
    ))}
  </div>
);

export default HeroStats;
