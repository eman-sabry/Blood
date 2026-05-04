export default function StatsCard({ label, value, icon, color, bg }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div
        className={`w-12 h-12 rounded-xl ${bg} ${color} flex items-center justify-center text-xl mb-4`}
      >
        {icon}
      </div>

      <p className="text-3xl font-black text-gray-900">{value}</p>

      <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mt-1">
        {label}
      </p>
    </div>
  );
}
