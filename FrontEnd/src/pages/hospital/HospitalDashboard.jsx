import React, { useState } from "react";
import { useAuthUser } from "../../Hooks/useAuthUser";
import { useHospitalData } from "../../Hooks/useHospitalData";
import { Link } from "react-router-dom";

import {
  FaPlus,
  FaMapMarkerAlt,
  FaTint,
  FaUsers,
  FaRegListAlt,
  FaSearch,
  FaHistory,
} from "react-icons/fa";
import StatCard from "../../components/dashboard/StatsCard";
import StockGrid from "../../components/stock/StockGrid";
import HospitalInfoCard from "../../components/dashboard/HospitalInfoCard";
import NotificationsPanel from "../../components/DonorPage/NotificationsPanel";

import ActiveRequestCard from "../../components/Request/ActiveRequestCard"
import DonationHistoryTable from "../../components/Dashboard/DonationHistoryTable";

export default function HospitalDashboard() {
  const { data: user, isLoading: authLoading } = useAuthUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("requests");

  const {
    activeRequests,
    bloodStock,
    availableDonors,
    donationHistory,
    loading,
    completeDonor,
    isCompletingDonor,
  } = useHospitalData(user?.profileId);
const { notifications } = useHospitalData(user?.userId);

    if (loading || authLoading)
      return (
        <div className="h-screen flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">
            Loading....
          </p>
        </div>
      );
 

  return (
    <div className="space-y-8 mt-20 md:mt-0 p-4 md:p-6">
      {/* HEADER */}
      <h1 className="text-4xl font-black text-slate-800 tracking-tight">
        Hospital Panel
      </h1>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">
            {user?.name || "Hospital Dashboard"}
          </h2>
          <p className="flex items-center gap-2 text-gray-500">
            <FaMapMarkerAlt className="text-red-500" />
            {user?.address}
          </p>
        </div>

        <Link
          to="/hospital/create-request"
          className="bg-red-600 hover:bg-red-700 text-white  font-bold px-4 py-2 rounded-xl flex items-center gap-2"
        >
          <FaPlus /> New Request
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard
          title="Active Requests"
          value={activeRequests?.length || 0}
          icon={FaRegListAlt}
          color="bg-blue-500"
        />

        <StatCard
          title="Total Donors"
          value={availableDonors?.length || 0}
          icon={FaUsers}
          color="bg-purple-500"
        />

        <StatCard
          title="Stock Units"
          value={bloodStock?.reduce((a, b) => a + Number(b.quantity), 0) || 0}
          icon={FaTint}
          color="bg-red-500"
        />
      </div>
      {/* NOTIFICATIONS */}
      {notifications.filter((n) => n.status === "Unread").length > 0 && (
        <NotificationsPanel notifications={notifications} />
      )}

      {/* MAIN */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* LEFT */}
        <div>
          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab("requests")}
              className={`px-4 py-2 rounded-xl text-sm ${
                activeTab === "requests"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              Requests
            </button>

            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-2 rounded-xl text-sm ${
                activeTab === "history"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              History
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4 ">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 p-2 border rounded-xl"
            />
          </div>
          <div className="h-80 overflow-y-scroll">
            {/* Requests */}
            {activeTab === "requests" && (
              <div className="space-y-3">
                {activeRequests.length > 0 ? (
                  activeRequests.map((req) => (
                    <ActiveRequestCard
                      key={req.id}
                      request={req}
                      onComplete={completeDonor}
                      isCompleting={isCompletingDonor}
                    />
                  ))
                ) : (
                  <p className="text-center text-gray-400 py-6">No requests</p>
                )}
              </div>
            )}

            {/* History */}
            {activeTab === "history" && (
              <DonationHistoryTable
                history={donationHistory}
                searchQuery={searchQuery}
              />
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <div className="flex items-center gap-2 mb-8 pb-4 border-b border-gray-50">
            <div className="p-2 bg-red-50 rounded-lg">
              <FaTint className="text-red-600 text-xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Inventory Status
            </h1>
          </div>
          <StockGrid bloodStock={bloodStock} />
        </div>
      </div>

      <HospitalInfoCard user={user} />
    </div>
  );
}
