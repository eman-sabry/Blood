import React from "react";

export default function DonationHistoryTable({ donationHistory }) {
  const statusStyles = {
    Completed: "text-green-600 font-medium",
    Cancelled: "text-red-500 font-medium",
    OnTheWay: "text-orange-500 font-medium",
  };

  const statusLabels = {
    Completed: "Completed",
    Cancelled: "Cancelled, Health condition not suitable",
    OnTheWay: "OnTheWay",
  };
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50">
      <h3 className="font-bold text-lg mb-6 text-gray-800">Donation History</h3>
      <div className="h-100 overflow-y-scroll">
        {donationHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-xs uppercase border-b border-gray-50">
                  <th className="pb-4 font-semibold">Hospital</th>
                  <th className="pb-4 font-semibold">Date</th>
                  <th className="pb-4 font-semibold">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {donationHistory.map((h) => (
                  <tr key={h.id} className="text-sm">
                    <td className="py-4 font-medium text-gray-800">
                      {h.hospitalName}
                    </td>

                    <td className="py-4 text-gray-500">
                      {new Date(h.updatedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td
                      className={`py-4 ${statusStyles[h.status] || "text-gray-500"}`}
                    >
                      {statusLabels[h.status] || h.status}
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400 text-sm italic py-4">
            You haven't donated yet. Start your journey today!
          </p>
        )}
      </div>
    </div>
  );
}
