import {
  FaMapMarkerAlt,
  FaHeart,
  FaLock,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function BloodRequestCard({
  request,
  canDonate, // صلاحية الـ 90 يوم
  onDonate, // دالة acceptRequest
  isAccepting, // حالة الـ Loading
  hasActiveTrip, // هل لديه مشوار حالي؟
}) {
  // تحديد نص الزرار بناءً على الحالة
  const canDonateBool = !!canDonate;
  const hasActiveTripBool = !!hasActiveTrip;
  const isAcceptingBool = !!isAccepting;

  const isButtonDisabled = 
    !canDonateBool || 
    hasActiveTripBool || 
    request.quantity === 0 || 
    isAcceptingBool;

  const getDisabledMessage = () => {
    if (hasActiveTripBool) return "Active Trip in Progress";
    if (!canDonateBool) return "90 Days Rest Period";
    if (request.quantity === 0) return "Requirement Met";
    return "Currently Unavailable";
  };
  return (
    <div className="p-4 border border-gray-100 rounded-2xl hover:border-red-200 transition-colors bg-white shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div className="bg-red-50 text-red-600 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm">
          {request.bloodTypeNeeded}
        </div>

        <div className="flex flex-col items-end gap-1">
          <span
            className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${
              request.status === "Urgent"
                ? "bg-red-600 text-white"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {request.status}
          </span>

          <span className="text-[10px] text-gray-400">
            {request.quantity} Bags Remaining
          </span>
        </div>
      </div>

      {/* Hospital Info */}
      <div className="mb-3">
        <p className="font-bold text-gray-800 text-sm truncate">
          {request.hospitalName}
        </p>
        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
          <FaMapMarkerAlt className="text-red-400 text-[10px]" />
          <span className="truncate">
            {request.hospitalAddress || "Near You"}
          </span>
        </p>
      </div>

      {/* Action Button */}
      {!isButtonDisabled ? (
        <button
          onClick={() => onDonate(request.id)}
          disabled={isAccepting}
          className="w-full mt-2 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm shadow-red-200"
        >
          {isAccepting ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <FaHeart className="animate-pulse" /> Donate Now
            </>
          )}
        </button>
      ) : (
        <div className="group relative">
          <button
            disabled
            className="w-full mt-2 py-2.5 bg-gray-50 text-gray-400 text-[11px] font-bold rounded-xl cursor-not-allowed flex items-center justify-center gap-2 border border-gray-100"
          >
            <FaLock className="text-[10px]" /> {getDisabledMessage()}
          </button>

          {/* رسالة توضيحية تظهر عند الوقوف بالماوس على الزرار المعطل */}
          {hasActiveTrip && (
            <p className="text-[9px] text-amber-600 text-center mt-1 flex items-center justify-center gap-1">
              <FaExclamationTriangle /> Finish your current trip first
            </p>
          )}
        </div>
      )}
    </div>
  );
}
