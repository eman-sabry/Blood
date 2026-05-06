import React from "react";
import { FaHospital, FaPhoneAlt, FaTrash, FaEnvelope } from "react-icons/fa";

const PendingApprovals = ({ hospitals = [], confirmAction }) => {

  const pendingHospitals = hospitals.filter((h) => h.status === "pending");

  return (
    <div className="w-full">
      <div className="space-y-6">
        {pendingHospitals.length > 0 ? (
          pendingHospitals.map((h) => (
            <div
              key={h.id}
              className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">

                <div className="flex items-center gap-6 relative z-10">
                  <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[1.8rem] flex items-center justify-center text-3xl border border-blue-100 group-hover:rotate-6 transition-transform">
                    <FaHospital />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 text-xl tracking-tight">
                      {h.displayName || h.hospitalName || "Unnamed Hospital"}
                    </h4>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase rounded-lg border border-amber-100 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping"></span>
                        Awaiting Verification
                      </span>
                    </div>
                  </div>
                </div>

       
       
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
                      <FaPhoneAlt className="text-blue-400" size={12} />
                      {h.phone || h.User?.phone || "N/A"}
                    </p>
                    <p className="text-sm font-bold text-slate-600 flex items-center gap-2">
                      <FaEnvelope className="text-blue-400" size={12} />
                      <span className="truncate max-w-[150px]">
                        {h.email || h.User?.email || "N/A"}
                      </span>
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-black text-gray-300 tracking-widest">
                      Location
                    </p>
                    <p className="text-sm font-bold text-slate-400 truncate max-w-[180px] italic">
                      {h.address || "Address not provided"}
                    </p>
                  </div>
                </div>

               
                <div className="flex items-center gap-3 relative z-10">
                  <button
                    onClick={() => confirmAction(h.id, "hospital", "approve")}
                    className="flex-1 md:flex-none px-10 py-4 text-white rounded-[1.5rem] font-black text-sm bg-green-500 hover:bg-green-600 shadow-lg shadow-green-100 active:scale-95 transition-all"
                  >
                    Approve Entity
                  </button>
                  <button
                    onClick={() => confirmAction(h.id, "hospital", "delete")}
                    className="p-5 bg-red-50 text-red-500 rounded-[1.5rem] hover:bg-red-500 hover:text-white transition-all group-hover:rotate-12"
                    title="Reject/Delete"
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
    </div>
  );
};

export default PendingApprovals;
