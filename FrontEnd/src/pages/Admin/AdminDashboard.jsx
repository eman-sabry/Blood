import React, { useState } from "react";
import {
  FaUsers,
  FaHospital,
  FaHeartbeat,
  FaHistory,
  FaSearch,
  FaCheckCircle,
  FaExclamationCircle,
  FaChartLine,
  FaTrashAlt,
} from "react-icons/fa";
import { useAdminData } from "../../Hooks/useAdminData";

const StatCard = ({ label, value, icon, color, bg }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 transition-all hover:shadow-md hover:-translate-y-1">
    <div className={`${bg} ${color} p-4 rounded-2xl text-2xl shadow-inner`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
        {label}
      </p>
      <p className="text-3xl font-black text-slate-800">{value}</p>
    </div>
  </div>
);

export default function AdminDashboard() {
  const { donors, hospitals, requests, history, search, actions, isLoading } =
    useAdminData();
  const [activeTab, setActiveTab] = useState("approvals");

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-red-500 border-t-transparent rounded-full" />
      </div>
    );

  const stats = [
    {
      label: "Total Donors",
      value: donors.length,
      icon: <FaUsers />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Hospitals",
      value: hospitals.length,
      icon: <FaHospital />,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Pending Needs",
      value: requests.length,
      icon: <FaHeartbeat />,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      label: "Total History",
      value: history.length,
      icon: <FaChartLine />,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900">Admin Control</h1>
          <p className="text-gray-500 font-medium">
            Manage hospital approvals and emergency requests.
          </p>
        </div>
        <div className="relative w-full md:w-80 group">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-red-500 transition-colors" />
          <input
            type="text"
            placeholder="Search donors, hospitals..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none transition-all shadow-sm"
            value={search.term}
            onChange={(e) => search.setTerm(e.target.value)}
          />
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Custom Tabs */}
          <div className="flex bg-gray-100 p-1.5 rounded-2xl w-fit">
            <button
              onClick={() => setActiveTab("approvals")}
              className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "approvals" ? "bg-white text-slate-900 shadow-sm" : "text-gray-500 hover:text-slate-800"}`}
            >
              Approvals
            </button>
            <button
              onClick={() => setActiveTab("requests")}
              className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "requests" ? "bg-white text-slate-900 shadow-sm" : "text-gray-500 hover:text-slate-800"}`}
            >
              Live Requests
            </button>
          </div>

          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
            {activeTab === "approvals" ? (
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <FaExclamationCircle className="text-orange-500" /> Pending
                  Verification
                </h3>
                <div className="space-y-4">
                  {hospitals.filter((h) => !h.isApproved).length > 0 ? (
                    hospitals
                      .filter((h) => !h.isApproved)
                      .map((h) => (
                        <div
                          key={h.id}
                          className="flex items-center justify-between p-5 bg-gray-50 rounded-3xl border border-transparent hover:border-red-100 hover:bg-white transition-all group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-red-500 font-black">
                              H
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-800">
                                {h.hospitalName}
                              </h4>
                              <p className="text-xs text-gray-400">{h.email}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => actions.approveHospital(h)}
                              className="bg-green-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-green-700 transition shadow-lg shadow-green-100"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => actions.deleteHospital(h.id)}
                              className="p-3 text-gray-400 hover:text-red-500 transition"
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-20">
                      <FaCheckCircle className="mx-auto text-green-200 text-6xl mb-4" />
                      <p className="text-gray-400 font-medium">
                        All caught up! No pending approvals.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Live Requests Section */
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <FaHeartbeat className="text-red-500 animate-pulse" /> Live
                  Emergency Requests
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {requests.map((req) => (
                    <div
                      key={req.id}
                      className="p-5 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black rounded-lg uppercase tracking-tighter">
                          {req.bloodType} Required
                        </span>
                        <div className="flex items-center gap-1 text-orange-500">
                          <span className="text-[10px] font-bold uppercase">
                            {req.urgency}
                          </span>
                        </div>
                      </div>
                      <h4 className="text-2xl font-black text-slate-800 mb-1">
                        {req.unitsRequested}{" "}
                        <span className="text-sm font-normal text-gray-400">
                          Units
                        </span>
                      </h4>
                      <p className="text-sm text-gray-500 font-medium mb-4">
                        {req.hospitalName}
                      </p>
                      <div className="flex gap-2">
                        <button className="flex-1 bg-slate-900 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-slate-800 transition">
                          Contact
                        </button>
                        <button
                          onClick={() => actions.deleteRequest(req.id)}
                          className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:text-red-500 transition"
                        >
                          <FaTrashAlt size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Activity & Logs */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <FaHistory className="text-red-500" /> Recent Activity
            </h3>
            <div className="space-y-6">
              {history.slice(0, 5).map((log) => (
                <div
                  key={log.id}
                  className="relative pl-6 border-l border-white/10 group"
                >
                  <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                  <p className="text-sm font-bold text-white/90">
                    New Donation Logged
                  </p>
                  <p className="text-[10px] text-white/40 uppercase mt-1">
                    Donor ID: {log.donorId}
                  </p>
                  <p className="text-xs text-red-400 mt-0.5">
                    {log.hospitalName}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-red-50 rounded-[2rem] p-8 border border-red-100">
            <h4 className="text-red-600 font-bold mb-2">Admin Tip</h4>
            <p className="text-red-900/60 text-xs leading-relaxed">
              Always verify hospital credentials and license numbers via the
              Ministry of Health portal before approving new registrations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
