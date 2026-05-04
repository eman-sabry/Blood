import { FaCheckCircle, FaCar } from "react-icons/fa";

export default function DonorTimelineRow({
  donor,
  request,
  onComplete,
  isCompleting,
}) {
 
  if (!donor) return null;

  const statusColor = {
    OnTheWay: "text-orange-500 bg-orange-50",
    Completed: "text-green-600 bg-green-50",
    Cancelled: "text-gray-400 bg-gray-50",
  };

  const statusLabel = {
    OnTheWay: "On Way",
    Completed: "Done",
    Cancelled: "Cancelled",
  };


  const handleComplete = () => {
    onComplete({
      request,
      donorEntry: donor,
      statusAction: "Completed",
    });
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-white hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-3 flex-1 min-w-0">
    
        <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 font-bold text-sm flex items-center justify-center border border-red-100">
          {donor.bloodType || donor.donorBloodType || "?"}
        </div>

        <div className="min-w-0">
          <p className="font-semibold text-gray-800 text-sm truncate">
            {donor.donorName || "Unknown Donor"}
          </p>

          <div className="flex items-center gap-2 mt-1">
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${statusColor[donor.status] || "text-gray-500 bg-gray-50"}`}
            >
              {statusLabel[donor.status] || donor.status}
            </span>

            {donor.status === "OnTheWay" && (
              <span className="text-[10px] text-orange-500 flex items-center gap-1 animate-pulse">
                <FaCar /> Heading to hospital
              </span>
            )}
          </div>
        </div>
      </div>

      {donor.status === "OnTheWay" && (
        <button
          onClick={handleComplete}
          disabled={isCompleting}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
            isCompleting
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700 active:scale-95 shadow-sm"
          }`}
        >
          <FaCheckCircle />
          {isCompleting ? "Saving..." : "Complete"}
        </button>
      )}
      {donor.status === "Completed" && (
        <div className="text-green-500 text-lg">
          <FaCheckCircle />
        </div>
      )}
    </div>
  );
}
