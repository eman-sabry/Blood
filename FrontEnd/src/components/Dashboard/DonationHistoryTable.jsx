export default function DonationHistoryTable({ history, searchQuery }) {
  const filtered = searchQuery
    ? history.filter((h) =>
        h.donorName?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : history;

  if (!filtered.length) {
    return (
      <p className="text-gray-400 text-sm text-center py-6">No history found</p>
    );
  }

  const statusStyles = {
    Completed: "text-green-600 font-medium",
    Health_Not_Eligible: "text-red-500 font-medium",
    Pending: "text-yellow-500 font-medium",
  };

  const statusLabels = {
    Completed: "Completed",
    Health_Not_Eligible: "Health condition not suitable",
    Pending: "Pending",
  };

  return (
    <div className="overflow-x-auto rounded-xl shadow-sm bg-white">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr className="text-gray-500 border-b">
            <th className="py-3 px-4 text-left">Donor</th>
            <th className="py-3 px-4 text-left">Blood</th>
            <th className="py-3 px-4 text-left">Date</th>
            <th className="py-3 px-4 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((h) => (
            <tr key={h.id} className="border-b hover:bg-gray-50 transition">
              <td className="py-3 px-4">{h.donorName}</td>
              <td className="px-4">{h.donorBloodType}</td>
              <td className="px-4">
                {new Date(h.donationDate).toLocaleDateString()}
              </td>
              <td
                className={`px-4 ${statusStyles[h.status] || "text-gray-500"}`}
              >
                {statusLabels[h.status] || h.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
