import { FaExclamationTriangle } from "react-icons/fa";

export default function StockCard({ type, stock }) {
  const qty = stock?.quantity || 0;
  const isLow = qty < 5;

  return (
    <div
      className={`rounded-2xl p-5 border transition hover:scale-[1.02]
      ${isLow ? "bg-red-50 border-red-100" : "bg-white/70 border-gray-100"}`}
    >
      <p
        className={`text-lg font-extrabold ${
          isLow ? "text-red-600" : "text-gray-700"
        }`}
      >
        {type}
      </p>

      <p className="text-3xl font-black">{qty}</p>
      <p className="text-xs text-gray-400">Units</p>

      <div className="w-full h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
        <div
          className={`h-full ${isLow ? "bg-red-500" : "bg-green-500"}`}
          style={{ width: `${Math.min(qty * 10, 100)}%` }}
        />
      </div>

      {isLow && (
        <div className="mt-2 flex items-center gap-2 text-xs font-bold text-red-600">
          <FaExclamationTriangle />
          LOW STOCK
        </div>
      )}
    </div>
  );
}
