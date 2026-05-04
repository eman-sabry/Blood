import React from "react";
import {
  FaHospital,
  FaTint,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

export default function ActiveRequestCard({
  request,
}) {

  const formattedDate = new Date(request.updatedAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
       
        <div className="flex items-start gap-4">
          <div className="bg-red-50 p-3 rounded-xl">
            <FaTint className="text-red-500 text-xl" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-bold text-gray-800">
                Type: {request.bloodType || request.bloodTypeNeeded}
              </span>
              <span
                className={`px-3 py-1 text-xs font-bold rounded-full
                  ${
                    request.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : request.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
              >
                {request.status}
              </span>
            </div>
            <div className="space-y-1">
             
              <p className="text-gray-500 text-xs flex items-center gap-2">
                <FaClock className="text-gray-400" />
                {formattedDate}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
