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
import AdminReports from "./AdminReports";
import PendingApprovals from "./PendingApprovals";
import AdminAllRequests from "./AdminAllRequests";
const StatCard = ({ title, value, icon: Icon, color = "bg-gray-500" }) => {
  const textColor =
    typeof color === "string" ? color.replace("bg-", "text-") : "text-gray-500";
  return (
    <div className="group bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden relative">
  
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

  const pendingHospitals = hospitals.filter((h) => h.status === "pending");


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
          type === "hospital"
            ? actions.deleteHospital(id)
            : actions.deleteDonor(id);
        } else {
          actions.approve(id);
        }
      }
    });
  };

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
    <div className="p-6 md:p-10 mt-20 md:mt-0  min-h-screen font-sans relative overflow-hidden">
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
          <AdminReports />
        </div>

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
              <PendingApprovals
                hospitals={hospitals}
                confirmAction={confirmAction}
              />
            )}

            {activeTab === "Requests" && (
             <AdminAllRequests/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
