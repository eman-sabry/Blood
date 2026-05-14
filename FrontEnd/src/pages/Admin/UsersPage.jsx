import { useState } from "react";
import {
  FaSearch,
  FaTrash,
  FaUsers,
  FaHospital,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { useAdminData } from "../../Hooks/useAdminData";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
const ROLE_STYLE = {
  donor: {
    avatar:
      "bg-gradient-to-br from-red-50 to-red-100 text-red-700 border-red-200",
  },
  hospital: {
    avatar:
      "bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 border-blue-200",
  },
};

function UserAvatar({ image, name, role }) {
  const { avatar } = ROLE_STYLE[role] ?? ROLE_STYLE.donor;
  const initials =
    name
      ?.split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() || "?";

  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className="w-12 h-12 rounded-2xl object-cover shadow-sm border border-gray-100 shrink-0"
      />
    );
  }
  return (
    <div
      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold shadow-sm border shrink-0 ${avatar}`}
    >
      {initials}
    </div>
  );
}

export default function UsersPage() {
  const {
    donors = [],
    hospitals = [],
    search,
    actions,
    isLoading,
  } = useAdminData();
  const [activeTab, setActiveTab] = useState("donors");

  // دالة الحذف الموحدة مع SweetAlert
const handleDelete = (id, name) => {
  Swal.fire({
    title: "Confirm Deletion",
    text: `Are you sure you want to remove ${name}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    confirmButtonText: "Yes, Remove",
    customClass: { popup: "rounded-[2rem]" },
  }).then((result) => {
    if (result.isConfirmed) {
    
      if (activeTab === "donors") {
        actions.deleteDonor(id);
      } else {
        actions.deleteHospital(id);
      }
      toast.success(`Removed ${name} from system.`);
    }
  });
};

  const currentData = activeTab === "donors" ? donors : hospitals;
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
    <div className="p-6 max-w-7xl mx-auto space-y-6 mt-20 md:mt-0 ">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            System Registry
          </h1>
          <p className="text-gray-400 mt-1 font-medium">
            Manage and monitor all platform participants
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex bg-gray-50 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab("donors")}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-black transition-all ${activeTab === "donors" ? "bg-white text-red-600 shadow-md scale-105" : "text-gray-400 hover:text-gray-600"}`}
          >
            <FaUsers /> Donors{" "}
            <span className="ml-1 opacity-50">{donors?.length || 0}</span>
          </button>
          <button
            onClick={() => setActiveTab("hospitals")}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-black transition-all ${activeTab === "hospitals" ? "bg-white text-blue-600 shadow-md scale-105" : "text-gray-400 hover:text-gray-600"}`}
          >
            <FaHospital /> Hospitals{" "}
            <span className="ml-1 opacity-50">{hospitals?.length || 0}</span>
          </button>
        </div>

        <div className="relative flex-1 max-w-md group">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-red-500 transition-colors" />
          <input
            type="text"
            placeholder="Search by name, phone..."
            className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500/20 outline-none text-sm transition-all"
            value={search.term}
            onChange={(e) => search.setTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-100/50 border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr className="text-gray-400 text-[11px] uppercase tracking-[0.2em] font-black">
              <th className="px-8 py-6">Member Identity</th>
              <th className="px-8 py-6">Specifications</th>
              <th className="px-8 py-6">Contact Matrix</th>
              <th className="px-8 py-6">Status</th>
              <th className="px-8 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {currentData.map((item) => {
              const displayName =
                item.User?.name ||
                item.name ||
                item.hospitalName ||
                "Unknown User";
              return (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/50 transition-all group"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <UserAvatar
                        image={item.User?.image || item.image}
                        name={displayName}
                        role={activeTab === "donors" ? "donor" : "hospital"}
                      />
                      <div>
                        <p className="font-black text-slate-800 text-sm tracking-tight group-hover:text-red-600 transition-colors">
                          {displayName}
                        </p>
                        <span className="text-[10px] font-mono text-gray-300 bg-gray-100 px-1.5 py-0.5 rounded uppercase">
                          ID-{String(item.id).slice(-5)}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-5">
                    {activeTab === "donors" ? (
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-600 rounded-xl text-xs font-black border border-red-100">
                          {item.bloodType}
                        </span>
                        <div className="text-[10px] text-gray-400 font-bold uppercase">
                          {item.age} Yrs | {item.weight} KG
                        </div>
                      </div>
                    ) : (
                      <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100 uppercase tracking-widest">
                        Medical Entity
                      </span>
                    )}
                  </td>

                  <td className="px-8 py-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <FaPhoneAlt className="text-[10px] text-red-400" />
                        {item.User?.phone || item.phone || "No Phone"}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <FaEnvelope className="text-[10px] text-red-400" />
                        {item.User?.email || item.email || "No Phone"}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400">
                        <FaMapMarkerAlt className="shrink-0" />
                        <span className="truncate max-w-[150px]">
                          {item.address || "Location N/A"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full
                  ${
                    item.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleDelete(item.id, displayName)}
                        className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {currentData.length === 0 && (
          <div className="py-32 text-center">
            <div className="inline-block p-6 bg-gray-50 rounded-full mb-4">
              <FaSearch size={30} className="text-gray-200" />
            </div>
            <p className="text-gray-400 font-medium italic">
              No records found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
