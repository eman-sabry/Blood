import { useAuthUser } from "../../Hooks/useAuthUser";
import { useDonorData } from "../../Hooks/useDonorData";
import BloodRequestCard from "../../components/DonorPage/BloodRequestCard";
import OnTheWayTimeline from "../../components/DonorPage/OnTheWayTimeline";
import { FaTint } from "react-icons/fa";

export default function RequestsPage() {
  const { data: user } = useAuthUser();

  const {
    donor,
    compatibleRequests,
    onTheWayRequests,
    hospitals,
    stats,
    actions,
    loading,
  } = useDonorData(user?.profileId || user?.id);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin h-10 w-10 border-b-2 border-red-600 rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* 🔥 TIMELINE (NEW) */}
      {onTheWayRequests?.length > 0 && (
        <div className="max-w-5xl mx-auto mt-6 mb-6">
          <OnTheWayTimeline
            requests={onTheWayRequests}
            hospitals={hospitals}
            donorId={user?.userId || user?.id}
            onConfirm={actions.confirmArrival}
            onCancel={actions.cancelRequest}
            isCancelling={actions.isCancelling}
          />
        </div>
      )}

      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-6 text-center mt-20 md:mt-0">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Blood Requests
          </h2>
        </div>

        <p className="text-gray-500 text-sm">
          Find compatible donation requests near you
        </p>

        <div className="mt-4 flex justify-center gap-3 flex-wrap">
          <span className="bg-white shadow-sm px-4 py-1 rounded-full text-sm text-gray-600">
            {donor?.bloodType || ""}
          </span>

          <span className="bg-red-50 text-red-600 px-4 py-1 rounded-full text-sm">
            {compatibleRequests.length} Available Requests
          </span>

          <span className="bg-green-50 text-green-600 px-4 py-1 rounded-full text-sm">
            {stats.canDonate ? "Eligible" : "Not Eligible"}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto">
        {compatibleRequests.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border">
            <p className="text-gray-400">
              No compatible blood requests available right now
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {compatibleRequests.map((req) => {
              // 1. ابحث عن بيانات المستشفى المرتبطة بهذا الطلب
              const hospital = hospitals?.find((h) => h.id === req.hospitalId);

              // 2. دمج البيانات لضمان وصول الاسم والعنوان للكارد
              const enrichedRequest = {
                ...req,
                hospitalName:
                  hospital?.name || req.hospitalName || "Unknown Hospital",
                hospitalAddress:
                  hospital?.address ||
                  req.hospitalAddress ||
                  "Location not specified",
              };

              return (
                <BloodRequestCard
                  key={req.id}
                  request={enrichedRequest} // نرسل الطلب المعدل
                  hasActiveTrip={onTheWayRequests?.length > 0}
                  canDonate={
                    !!(
                      stats?.canDonate &&
                      donor?.bloodType &&
                      req.bloodTypeNeeded
                    )
                  }
                  onDonate={actions.acceptRequest}
                  isAccepting={actions.isAccepting}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
