import React from "react";
import { useHospitalData } from "../../Hooks/useHospitalData";
import { useAuthUser } from "../../Hooks/useAuthUser";
import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaCarSide,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const DonationManagement = () => {
  const { data: user } = useAuthUser();
  const hospitalId = user?.profileId || user?.id;

  const {
    onTheWayDonors,
    activeRequests,
    completeDonor,
    isCompletingDonor,
    loading,
  } = useHospitalData(hospitalId);

  const getOriginalRequest = (donorEntry) => {
    return activeRequests.find((req) => req.id === donorEntry.requestId);
  };


  const handleComplete = (donorEntry) => {
    const originalRequest = getOriginalRequest(donorEntry);
    if (!originalRequest) return;

    Swal.fire({
      title: "Confirm Completion",
      text: `Confirming blood collection from ${donorEntry.donorName}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "green", // Emerald Green
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Received",
      customClass: { popup: "rounded-[2rem]" },
    }).then((result) => {
      if (result.isConfirmed) {
        completeDonor(
          {
            request: originalRequest,
            donorEntry: donorEntry,
            statusAction: "Completed",
          },
          {
            onSuccess: () => {
              toast.success("Donation completed and recorded!");
            },
          },
        );
      }
    });
  };

  
  const handleCancel = (donorEntry) => {
    const originalRequest = getOriginalRequest(donorEntry);
    if (!originalRequest) return;

    Swal.fire({
      title: "Cancel Donation?",
      text: `Are you sure you want to cancel ${donorEntry.donorName}'s trip?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444", // Red
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Cancel it",
      customClass: { popup: "rounded-[2rem]" },
    }).then((result) => {
      if (result.isConfirmed) {
        completeDonor(
          {
            request: originalRequest,
            donorEntry: donorEntry,
            statusAction: "Cancelled",
          },
          {
            onSuccess: () => {
              toast.info("Donation trip has been cancelled.");
            },
          },
        );
      }
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen mt-20 md:mt-0 ">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col  mb-10 gap-4">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Incoming Donors
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Track donors in real-time.
            </p>
          </div>
        </div>

        {/* List */}
        {onTheWayDonors.length === 0 ? (
          <div className="bg-white p-16 rounded-[2.5rem] shadow-sm text-center border border-slate-100">
            <h3 className="text-center text-gray-400 py-10 ">
              No active trips
            </h3>
          </div>
        ) : (
          <div className="grid gap-4">
            {onTheWayDonors.map((donor) => (
              <div
                key={donor.id}
                className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-5 w-full">
                    <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center font-black text-xl border border-red-100 shadow-sm">
                      {donor.bloodType}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg leading-tight">
                        {donor.donorName}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-slate-400 flex items-center gap-1">
                          <FaClock />{" "}
                          {new Date(donor.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100 uppercase tracking-wider">
                          On the way
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 w-full lg:w-auto">
                    <button
                      onClick={() => handleCancel(donor)}
                      disabled={isCompletingDonor}
                      className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-red-100 text-red-700 border-red-200  hover:bg-red-200 px-6 py-3 rounded-2xl font-bold transition-all active:scale-95 disabled:opacity-50"
                    >
                      <FaTimesCircle className="text-lg" /> Cancel
                    </button>

                    <button
                      onClick={() => handleComplete(donor)}
                      disabled={isCompletingDonor}
                      className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-green-100 text-green-700 border-green-200 hover:bg-green-200 px-6 py-3 rounded-2xl font-bold transition-all  active:scale-95 disabled:opacity-50"
                    >
                      {isCompletingDonor ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <FaCheckCircle className="text-lg" /> Complete
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationManagement;
