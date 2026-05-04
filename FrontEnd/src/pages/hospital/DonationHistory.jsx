import { useAuthUser } from "../../Hooks/useAuthUser";
import { useHospitalData } from "../../Hooks/useHospitalData";
import {
  FaTint,
  FaUser,
  FaHospital,
  FaCalendarAlt,
  FaHistory,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

export default function DonationHistoryPage() {
  const { data: user, isLoading: authLoading } = useAuthUser();
  const hospitalId = user?.profileId || user?.id;
  const { donationHistory, loading } = useHospitalData(hospitalId);


  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "OnTheWay":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <FaCheckCircle className="text-xs" />;
      case "OnTheWay":
        return <FaClock className="text-xs" />;
      case "Cancelled":
        return <FaTimesCircle className="text-xs" />;
      default:
        return null;
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-b-2 border-red-600 rounded-full" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8  min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-6">
        <div className="flex flex-col justify-center items-center w-full">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3">
            Donation History
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Track and manage all previous blood donation records.
          </p>
        </div>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Donor
                </th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Blood Type
                </th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Date
                </th>
               
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {donationHistory?.length > 0 ? (
                donationHistory.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-red-50/30 transition-colors group"
                  >
                    {/* DONOR */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
                          <FaUser size={16} />
                        </div>
                        <span className="font-semibold text-gray-800">
                          {item.donorName}
                        </span>
                      </div>
                    </td>

                    {/* BLOOD TYPE */}
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-red-600 font-bold">
                        <FaTint />
                        {item.bloodType}
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(item.status)}`}
                      >
                        {getStatusIcon(item.status)}
                        {item.status}
                      </span>
                    </td>

                    {/* DATE */}
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaCalendarAlt className="text-gray-400" />
                        {new Date(item.updatedAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </td>

                
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center opacity-40">
                      <FaHistory size={48} className="mb-4" />
                      <p className="text-xl font-medium">No records found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
