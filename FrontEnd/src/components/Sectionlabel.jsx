export default function SectionLabel({ label }) {
  return (
    <div className="flex items-center gap-3 mt-1">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
        {label}
      </span>
      <div className="h-px flex-1 bg-gray-100" />
    </div>
  );
}
