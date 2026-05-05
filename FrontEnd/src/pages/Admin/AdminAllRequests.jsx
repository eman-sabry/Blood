import React, { useState } from "react";
import { useAdminData } from "../../Hooks/useAdminData";
import {
  FaTint,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaHospital,
  FaSearch,
} from "react-icons/fa";

export default function AdminAllRequests() {
  const { requests, isLoading } = useAdminData();
  const [filterBlood, setFilterBlood] = useState("");
  const [filterHospName, setFilterHospName] = useState("");

  const filteredRequests = requests.filter((req) => {
    const matchesBlood = filterBlood
      ? req.bloodTypeNeeded === filterBlood
      : true;
    const matchesHosp = filterHospName
      ? req.hospitalName.toLowerCase().includes(filterHospName.toLowerCase())
      : true;
    return matchesBlood && matchesHosp;
  });

  if (isLoading)
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">
          Loading....
        </p>
      </div>
    );

  return (
    <div className="p-6  min-h-screen mt-20 md:mt-0 ">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold flex items-center gap-2 mb-6">
             Active Blood Requests
          </h1>

          {/* Filters Bar - التعديل هنا ليكون خارج الـ Grid */}
          <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="flex-1 relative">
              <input
                placeholder="Search hospital name..."
                className="w-full bg-gray-50 pl-12 pr-4 py-3 rounded-2xl border-none text-sm font-bold outline-none focus:ring-2 ring-red-100 transition-all"
                value={filterHospName}
                onChange={(e) => setFilterHospName(e.target.value)}
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative">
              <select
                className="w-full md:w-60 bg-gray-50 px-10 py-3 rounded-2xl border-none text-sm font-black text-slate-700 outline-none cursor-pointer appearance-none focus:ring-2 ring-red-100"
                value={filterBlood}
                onChange={(e) => setFilterBlood(e.target.value)}
              >
                <option value="">All Blood Types</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Requests Grid */}
        {filteredRequests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {filteredRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md hover:border-red-100 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      {req.hospitalName}
                    </h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <FaMapMarkerAlt className="text-red-400" />{" "}
                      {req.hospitalAddress}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-medium opacity-80">
                      Type
                    </span>
                    <span className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-600 rounded-xl text-xs font-black border border-red-100">
                      {req.bloodTypeNeeded}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-2xl p-3 mb-4">
                  <div className="text-center border-r border-gray-200">
                    <p className="text-[10px] text-gray-400 uppercase font-bold">
                      Required
                    </p>
                    <p className="font-black text-gray-800">
                      {req.quantity} Bags
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-gray-400 uppercase font-bold">
                      Status
                    </p>
                    <p
                      className={`text-[10px] font-black uppercase tracking-tighter mt-1 ${
                        req.status === "Completed"
                          ? "text-green-600"
                          : req.status === "Pending"
                            ? "text-orange-500"
                            : "text-red-600"
                      }`}
                    >
                      {req.status}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-gray-400 pt-3 border-t border-gray-50 font-bold">
                  <span className="flex items-center gap-1 uppercase">
                    <FaCalendarAlt />{" "}
                    {new Date(req.createdAt || req.time).toLocaleDateString()}
                  </span>
                  <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded-lg">
                    ID: #{req.id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <FaSearch size={40} className="mb-4 opacity-20" />
            <p className="font-medium">
              No requests found matching your filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
