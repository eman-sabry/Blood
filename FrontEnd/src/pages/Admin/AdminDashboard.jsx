import React, { useState } from "react";
import {
  FaUsers,
  FaHospital,
  FaCheck,
  FaHistory,
  FaClock,
  FaPhoneAlt,
  FaTrash,
  FaBell,
  FaArrowUp,
  FaEllipsisV,
} from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { useAdminData } from "../../Hooks/useAdminData";
import Swal from "sweetalert2";

// 1. مكون بطاقة الإحصائيات المطور (تفاعلي مع بياناتك)
const StatCard = ({ title, value, icon: Icon, color = "bg-gray-500" }) => {
  const textColor =
    typeof color === "string" ? color.replace("bg-", "text-") : "text-gray-500";
  return (
    <div className="group bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden relative">
      {/* أيقونة خلفية كبيرة تعطي عمقاً بصرياً */}
      <div
        className={`absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity ${textColor}`}
      >
        {Icon && <Icon size={100} />}
      </div>

      <div
        className={`p-4 rounded-2xl ${color} bg-opacity-10 text-2xl ${textColor} group-hover:scale-110 transition-transform relative z-10`}
      >
        {Icon && <Icon />}
      </div>

      <div className="relative z-10">
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">
          {title}
        </p>
        <h3 className="text-3xl font-black text-slate-800 tracking-tight">
          {value ?? 0}
        </h3>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const { donors, hospitals, requests, actions, isLoading } = useAdminData();
  const [activeTab, setActiveTab] = useState("verification");
  const [filterBlood, setFilterBlood] = useState("");
  const [filterHospName, setFilterHospName] = useState("");

  const pendingHospitals = hospitals.filter((h) => h.status === "pending");
  const filteredRequests = requests.filter((req) => {
    const matchesBlood = filterBlood
      ? req.bloodTypeNeeded === filterBlood
      : true;
    const matchesHosp = filterHospName
      ? req.hospitalName.toLowerCase().includes(filterHospName.toLowerCase())
      : true;
    return matchesBlood && matchesHosp;
  });

  const confirmAction = (id, type, actionName) => {
    const isDelete = actionName === "delete";
    Swal.fire({
      title: isDelete ? "Delete User?" : "Approve Hospital?",
      text: isDelete
        ? "This deletes the User and Profile permanently!"
        : "Hospital will be activated.",
      icon: isDelete ? "warning" : "question",
      showCancelButton: true,
      confirmButtonColor: isDelete ? "#ef4444" : "#10b981",
      borderRadius: "2rem",
    }).then((result) => {
      if (result.isConfirmed) {
        if (isDelete) {
          type === "hospital" ? actions.deleteH(id) : actions.deleteD(id);
        } else {
          actions.approve(id);
        }
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen font-black text-slate-800 bg-[#fbfbfb]">
        <div className="animate-bounce">Loading Systems...</div>
      </div>
    );

  return (
    <div className="p-6 md:p-10  min-h-screen font-sans relative overflow-hidden">
  
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">
              Admin Panel
            </h1>
            <p className="text-gray-400 font-medium">
              Control center for blood donation network
            </p>
          </div>
         
        </div>

        {/* 2. Stats Grid (ببياناتك الفعلية) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            title="Total Donors"
            value={donors.length}
            icon={FaUsers}
            color="bg-red-500"
          />
          <StatCard
            title="Total Hospitals"
            value={hospitals.length}
            icon={FaHospital}
            color="bg-blue-500"
          />
          <StatCard
            title="System Requests"
            value={requests.length}
            icon={FaDroplet}
            color="bg-orange-500"
          />
          <StatCard
            title="Pending"
            value={pendingHospitals.length}
            icon={FaClock}
            color="bg-yellow-500"
          />
        </div>

        {/* 3. Main Content Area */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          {/* Tabs Navigation */}
          <div className="flex border-b p-3 bg-gray-50/50 gap-2">
            <button
              onClick={() => setActiveTab("verification")}
              className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] text-sm font-black transition-all ${
                activeTab === "verification"
                  ? "bg-white shadow-md text-red-600 scale-105"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <FaCheck /> Pending Approvals
              {pendingHospitals.length > 0 && (
                <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse">
                  {pendingHospitals.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("Requests")}
              className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] text-sm font-black transition-all ${
                activeTab === "Requests"
                  ? "bg-white shadow-md text-red-600 scale-105"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <FaHistory /> System Requests
            </button>
          </div>

          <div className="p-8">
            {activeTab === "verification" && (
              <div className="space-y-6">
                {pendingHospitals?.length > 0 ? (
                  pendingHospitals?.map((h) => (
                    <div
                      key={h.id}
                      className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        {/* Hospital Info */}
                        <div className="flex items-center gap-6 relative z-10">
                          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[1.8rem] flex items-center justify-center text-3xl border border-blue-100 group-hover:rotate-6 transition-transform">
                            <FaHospital />
                          </div>
                          <div>
                            <h4 className="font-black text-slate-800 text-xl tracking-tight">
                              {h.displayName || h.hospitalName}
                            </h4>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase rounded-lg border border-amber-100 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping"></span>
                                Awaiting Verification
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Data Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 max-w-2xl relative z-10">
                          <div className="space-y-1">
                            <p className="text-[10px] uppercase font-black text-gray-300 tracking-widest">
                              License No.
                            </p>
                            <p className="text-sm font-mono font-bold text-slate-600 bg-gray-50 px-3 py-1 rounded-xl inline-block border border-gray-100">
                              {h.licenseNumber || "LN-CERT-PENDING"}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] uppercase font-black text-gray-300 tracking-widest">
                              Contact
                            </p>
                            <p className="text-sm font-bold text-slate-600 flex items-center gap-2">
                              <FaPhoneAlt className="text-blue-400" />{" "}
                              {h.phone || h.User?.phone}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] uppercase font-black text-gray-300 tracking-widest">
                              Location
                            </p>
                            <p className="text-sm font-bold text-slate-400 truncate max-w-[180px] italic">
                              {h.address}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 relative z-10">
                          <button
                            onClick={() =>
                              confirmAction(h.id, "hospital", "approve")
                            }
                            className="flex-1 md:flex-none px-10 py-4 text-white rounded-[1.5rem] font-black text-sm bg-green-500 hover:bg-green-600 shadow-lg shadow-green-100 active:scale-95 transition-all"
                          >
                            Approve Entity
                          </button>
                          <button
                            onClick={() =>
                              confirmAction(h.id, "hospital", "delete")
                            }
                            className="p-5 bg-red-50 text-red-500 rounded-[1.5rem] hover:bg-red-500 hover:text-white transition-all group-hover:rotate-12"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-32 bg-gray-50/50 rounded-[4rem] border-4 border-dashed border-gray-100">
                    <div className="text-gray-200 text-8xl mb-6 flex justify-center opacity-50">
                      <FaHospital />
                    </div>
                    <p className="text-gray-400 text-xl font-black tracking-tight">
                      Great job! No hospitals awaiting approval.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "Requests" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                {/* Filters */}
                <div className="flex flex-wrap gap-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <div className="flex-1 min-w-[200px] relative">
                    <input
                      placeholder="Search hospital name..."
                      className="w-full bg-white pl-12 pr-4 py-4 rounded-2xl border-none shadow-sm text-sm font-bold outline-none focus:ring-2 ring-red-100 transition-all"
                      value={filterHospName}
                      onChange={(e) => setFilterHospName(e.target.value)}
                    />
                    <FaHospital className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                  </div>
                  <select
                    className="bg-white px-8 py-4 rounded-2xl border-none shadow-sm text-sm font-black text-slate-700 outline-none cursor-pointer"
                    value={filterBlood}
                    onChange={(e) => setFilterBlood(e.target.value)}
                  >
                    <option value="">All Blood Types</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                      (t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ),
                    )}
                  </select>
                </div>

                {/* Requests Table */}
                <div className="overflow-hidden rounded-[2rem] border border-gray-100 shadow-sm">
                  <table className="w-full text-left border-collapse bg-white">
                    <thead className="bg-slate-800 text-white">
                      <tr>
                        <th className="p-6 font-black text-[10px] uppercase tracking-[0.2em]">
                          Hospital Entity
                        </th>
                        <th className="p-6 font-black text-[10px] uppercase tracking-[0.2em]">
                          Blood Type
                        </th>
                        <th className="p-6 font-black text-[10px] uppercase tracking-[0.2em]">
                          Current Status
                        </th>
                        <th className="p-6 font-black text-[10px] uppercase tracking-[0.2em] text-right">
                          Created At
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredRequests.map((req) => (
                        <tr
                          key={req.id}
                          className="hover:bg-red-50/30 transition-colors group"
                        >
                          <td className="p-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-red-100 group-hover:text-red-500 transition-colors">
                                <FaHospital size={12} />
                              </div>
                              <span className="font-black text-slate-700">
                                {req.hospitalName}
                              </span>
                            </div>
                          </td>
                          <td className="p-6">
                            <span className="px-4 py-2 bg-red-600 text-white rounded-xl font-black text-xs shadow-md shadow-red-100">
                              {req.bloodTypeNeeded}
                            </span>
                          </td>
                          <td className="p-6">
                            <span
                              className={`px-4 py-1.5 text-[10px] font-black rounded-full uppercase tracking-widest ${
                                req.status === "Completed"
                                  ? "bg-green-100 text-green-700"
                                  : req.status === "Pending"
                                    ? "bg-orange-100 text-orange-700"
                                    : "bg-red-100 text-red-700"
                              }`}
                            >
                              {req.status}
                            </span>
                          </td>
                          <td className="p-6 text-right text-gray-400 font-bold text-xs">
                            {new Date(req.createdAt).toLocaleDateString(
                              undefined,
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
