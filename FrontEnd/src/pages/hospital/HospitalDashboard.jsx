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

import StatsCard from "../../components/dashboard/StatsCard";
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
  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-b-2 border-red-600 rounded-full" />
      </div>
    );
  }

  const stats = [
    {
      label: "Active Requests",
      value: activeRequests.length,
      icon: <FaRegListAlt />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Total Donors",
      value: availableDonors.length,
      icon: <FaUsers />,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Stock Units",
      value: bloodStock.reduce((a, b) => a + b.quantity, 0),
      icon: <FaTint />,
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="space-y-8 mt-20 md:mt-0 p-4 md:p-6">
      {/* HEADER */}
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
          className="bg-red-500 text-white px-4 py-2 rounded-xl flex items-center gap-2"
        >
          <FaPlus /> New Request
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <StatsCard key={i} {...s} />
        ))}
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
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              Requests
            </button>

            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-2 rounded-xl text-sm ${
                activeTab === "history"
                  ? "bg-green-600 text-white"
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
