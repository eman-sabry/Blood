import {
  FaTint,
  FaHeart,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaCar,
  FaHospital,
  FaTimes,
} from "react-icons/fa";

export default function OnTheWayTimeline({
  requests, 
  onCancel,
  isCancelling,
}) {
  if (!requests || requests.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-orange-100">
      <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center gap-2">
        <FaCar className="text-orange-500" /> My Active Trips
      </h3>

      <div className="space-y-4">
        {requests.map((record) => {
         
          const hospitalName = record.hospitalName || "Hospital";
          const hospitalAddress = record.hospitalAddress || "";

          
          const acceptedAt = record.date
            ? new Date(record.date).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "";

          return (
            <div
              key={record.id} 
              className="border border-orange-100 rounded-2xl p-4 bg-orange-50/40"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-bold text-gray-800">{hospitalName}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <FaMapMarkerAlt className="text-[10px]" />
                    {hospitalAddress}
                  </p>
                </div>

                <span className="bg-red-100 text-red-600 font-bold text-sm px-3 py-1 rounded-lg">
                  {record.bloodType}
                </span>
              </div>

              {/* Timeline Steps */}
              <div className="flex items-center gap-2 mb-4">
                {/* Step 1: Accepted */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                    <FaCheckCircle />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1 text-center">
                    Accepted
                  </p>
                  {acceptedAt && (
                    <p className="text-[9px] text-gray-400">{acceptedAt}</p>
                  )}
                </div>

                <div className="flex-1 h-0.5 bg-orange-300 relative">
                  <div className="absolute inset-0 bg-orange-400 animate-pulse" />
                </div>

                {/* Step 2: On The Way */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white text-xs animate-bounce">
                    <FaCar />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1 text-center">
                    On The Way
                  </p>
                </div>

                <div className="flex-1 h-0.5 bg-gray-200" />

                {/* Step 3: Hospital Arrival */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                    <FaHospital />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1 text-center">
                    Hospital
                  </p>
                </div>

                <div className="flex-1 h-0.5 bg-gray-200" />

                {/* Step 4: Success */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                    <FaHeart />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1 text-center">
                    Finished
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <div className="flex-1 bg-white border border-green-200 rounded-xl py-2 px-4 flex items-center justify-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <p className="text-xs text-green-700 font-bold">
                    Heading to Hospital...
                  </p>
                </div>

                <button
                  onClick={() => onCancel(record.requestId)} 
                  disabled={isCancelling}
                  className="px-4 py-2 bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-500 text-xs font-bold rounded-xl transition-colors disabled:opacity-50 flex items-center gap-1"
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
