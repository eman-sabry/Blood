import { FaExclamationTriangle, FaTint } from "react-icons/fa";

export default function ExpiringStock({ expiringStock }) {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 space-y-4 mt-20">
      {/* HEADER */}
      <div className="flex items-center gap-2 text-yellow-700 font-bold">
        <FaExclamationTriangle />
        Expiring Soon Stock
      </div>

      <p className="text-xs text-yellow-600">
        These blood units will expire within 3 days
      </p>

      {/* EMPTY STATE */}
      {!expiringStock?.length ? (
        <div className="text-center py-6 text-gray-500 text-sm">
          No expiring stock
        </div>
      ) : (
        <div className="space-y-2">
          {/* 🔥 COLUMN HEADERS */}
          <div className="grid grid-cols-3 text-xs font-bold text-gray-500 border-b border-yellow-200 pb-2">
            <div>Blood Type</div>
            <div>Units</div>
            <div>Expiry Date</div>
          </div>

          {/* ROWS */}
          {expiringStock.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-3 items-center p-3 rounded-xlborder border-yellow-100"
            >
              {/* TYPE */}
              <div className="flex items-center gap-2 font-bold text-gray-800">
                <FaTint className="text-red-500" />
                {item.bloodType}
              </div>

              {/* UNITS */}
              <div className="text-sm text-gray-600 font-medium">
                {item.quantity}
              </div>

              {/* EXPIRY */}
              <div className="text-xs text-red-500 font-semibold">
                {new Date(item.expiryDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
