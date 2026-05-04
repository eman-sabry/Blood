
import { FaCar, FaCheckCircle } from "react-icons/fa";
import DonorTimelineRow from "../Dashboard/DonorTimelineRow";

export default function ActiveRequestCard({
  request,
 
}) {

  return (
    
    <div className="border rounded-2xl overflow-hidden">
      {/* HEADER */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer"

      >
        <div>
          {/* Hospital */}
          <p className="font-bold text-gray-800">{request.hospitalName}</p>

          {/* Blood Type + Units */}
          <div className="flex items-center gap-2 mt-1">
            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded">
              {request.bloodTypeNeeded}
            </span>

            <span className="text-sm text-gray-500">
              {request.quantity} units
            </span>
          </div>

  
        </div>

      </div>

      {/* BODY */}
     
    </div>
  );
}
