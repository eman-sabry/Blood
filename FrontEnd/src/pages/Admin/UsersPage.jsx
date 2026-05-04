import { useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaUsers,
  FaHospital,
  FaFilter,
} from "react-icons/fa";
import { useAdminData } from "../../Hooks/useAdminData"; // تأكدي من المسار الصحيح لهوك البيانات

export default function UsersPage() {
  const { donors, hospitals, search, actions, isLoading } = useAdminData();
  const [activeTab, setActiveTab] = useState("donors");

  const currentData = activeTab === "donors" ? donors : hospitals;

  if (isLoading)
    return (
      <div className="p-10 text-center text-red-500 font-bold">
        Loading Users...
      </div>
    );
console.log("Current Tab:", activeTab, "Data:", currentData);
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            User Control Center
          </h2>
          <p className="text-gray-500">
            Manage all participants in the BloodLife ecosystem.
          </p>
        </div>
        <button className="bg-slate-900 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-red-600 transition-all shadow-md">
          <FaPlus size={14} /> Add New{" "}
          {activeTab === "donors" ? "Donor" : "Hospital"}
        </button>
      </header>

      {/* Filter & Search Bar */}
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap justify-between items-center gap-4">
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("donors")}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition ${activeTab === "donors" ? "bg-white text-red-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            <FaUsers /> Donors
          </button>
          <button
            onClick={() => setActiveTab("hospitals")}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition ${activeTab === "hospitals" ? "bg-white text-red-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            <FaHospital /> Hospitals
          </button>
        </div>

        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={`Search by name, ID, or blood type...`}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition"
            value={search.term}
            onChange={(e) => search.setTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Modern Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr className="text-gray-400 text-xs uppercase tracking-widest font-black">
              <th className="px-6 py-5">Identity</th>
              <th className="px-6 py-5">Info</th>
              <th className="px-6 py-5">Location</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {currentData.map((user) => (

              <tr key={user.id} className="hover:bg-red-50/30 transition group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white flex items-center justify-center font-black shadow-md">
                      {user.name?.[0] || user.hospitalName?.[0]}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 group-hover:text-red-600 transition">
                        {user.name || user.hospitalName}
                      </p>
                      <p className="text-xs text-gray-400 font-mono italic">
                        UID: {user.uid || user.id}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {activeTab === "donors" ? (
                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-lg font-black text-sm">
                      {user.bloodType}
                    </span>
                  ) : (
                    <span className="text-slate-600 font-medium text-sm">
                      Medical Center
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-600 font-medium">
                    {user.email}
                  </p>
                  <p className="text-xs text-gray-400">
                    {user.address || "City Center, Area 5"}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black border ${user.status === "Active" ? "bg-green-50 text-green-600 border-green-100" : "bg-yellow-50 text-yellow-600 border-yellow-100"}`}
                  >
                    {user.status || "Verified"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button className="p-2.5 text-slate-400 hover:bg-white hover:text-blue-500 rounded-xl shadow-sm transition border border-transparent hover:border-blue-100">
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => actions.deleteDonor(user.id)}
                      className="p-2.5 text-slate-400 hover:bg-white hover:text-red-500 rounded-xl shadow-sm transition border border-transparent hover:border-red-100"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
