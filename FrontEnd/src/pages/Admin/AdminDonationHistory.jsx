import React from "react";
import { useAdminData } from "../../Hooks/useAdminData";
import {
  FaHistory,
  FaSearch,
  FaHospital,
  FaUser,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

export default function AdminDonationHistory() {
  const {  history, search, isLoading } =
    useAdminData();
   const getStatusStyle = (status) => {
     switch (status) {
       case "Completed":
         return "bg-green-100 text-green-700 border-green-200";
       case "OnTheWay":
         return "bg-orange-100 text-orange-700 border-orange-200";
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
    if (isLoading)
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">
          Loading....
        </p>
      </div>
    )
  return (
    <div className="p-6 min-h-screen mt-20 md:mt-0 ">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Donation History
          </h1>
          <div className="relative w-64">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search donor or hospital..."
              className="pl-10 pr-4 py-2 w-full rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none"
              value={search.term}
              onChange={(e) => search.setTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
              <tr>
                <th className="px-6 py-4">Donor Name</th>
                <th className="px-6 py-4">Hospital</th>
                <th className="px-6 py-4 text-center">Blood Type</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {history.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-red-50/30 transition-colors group"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
                        <FaUser size={16} />
                      </div>
                      <span className="font-semibold text-gray-800">
                        {item.donorName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <FaHospital className="text-red-400 text-xs" />{" "}
                      {item.hospitalName}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-red-50 text-red-600 px-3 py-1 rounded-lg font-bold text-xs">
                      {item.bloodType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {new Date(item.updatedAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(item.status)}`}
                    >
                      {getStatusIcon(item.status)}
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
