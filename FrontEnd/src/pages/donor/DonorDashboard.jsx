import { useAuthUser } from "../../Hooks/useAuthUser";
import { useDonorData } from "../../Hooks/useDonorData";
import { DonorMap } from "../../components/DonorMap";
import {
  FaTint,
  FaHeart,
  FaCheckCircle,
  FaTimesCircle,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserShield,
  FaCar,
  FaHospital,
  FaBell,
  FaClock,
  FaLock,
  FaTimes,
} from "react-icons/fa";
import BloodRequestCard from "../../components/DonorPage/BloodRequestCard";
import OnTheWayTimeline from "../../components/DonorPage/OnTheWayTimeline";
import DonationHistoryTable from "../../components/DonorPage/DonationHistory";
import NearbyRequestsSection from "../../components/DonorPage/NearbyRequestsSection";
import NotificationsPanel from "../../components/DonorPage/NotificationsPanel";
export default function DonorDashboard() {
  const { data: user } = useAuthUser();
  const {
    donor,
    donationHistory,
    compatibleRequests,
    onTheWayRequests,
    hospitals,
    stats,
    actions,
    loading,
    hasActiveTrip,
  } = useDonorData(user?.profileId||user?.id);
const { notifications } = useDonorData(user?.userId );
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500" />
      </div>
    );

  if (!user && !loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-b-2 border-red-600 rounded-full" />
      </div>
    );
  const mapRequests = compatibleRequests
    .map((req) => {
      const hospital = hospitals?.find(
        (h) => String(h.id) === String(req.hospitalId),
      );

      return {
        ...req,
        lat: req.lat || hospital?.lat,
        lng: req.lng || hospital?.lng,
      };
    })
    .filter((r) => r.lat && r.lng);


  const onTheWayIds = new Set(onTheWayRequests.map((r) => r.id));
  const availableRequests = compatibleRequests.filter(
    (r) => !onTheWayIds.has(r.id),
  );

  return (
    <div className="p-4 mt-20 md:mt-0 md:p-8 space-y-8 bg-gray-50 min-h-screen font-sans">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        <div className="flex-1 bg-gradient-to-r from-red-500 to-red-600 p-8 rounded-3xl shadow-lg text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">
              Welcome, {donor?.name || user?.name}!
            </h2>
            <p className="opacity-90">Your donation saves real lives.</p>
            <div className="mt-6 flex gap-4 flex-wrap">
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm backdrop-blur-sm flex items-center gap-2">
                <FaUserShield /> {donor?.bloodType || "-"} Blood Type
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm backdrop-blur-sm flex items-center gap-2">
                <FaHeart /> {stats.livesImpacted} Lives Saved
              </span>
            </div>
          </div>
          <FaTint className="absolute -right-10 -bottom-10 text-white/10 text-[200px] rotate-12" />
        </div>

        {/* Eligibility */}
        <div className="md:w-80 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center">
          {stats.canDonate ? (
            <div className="flex items-center gap-2 text-green-600 mb-1">
              <FaCheckCircle />
              <p className="text-sm font-semibold">
                You are eligible to donate!
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-orange-500 mb-1">
              <FaClock />
              <p className="text-sm font-semibold">
                Wait {stats.daysLeft} days
              </p>
            </div>
          )}
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {stats.canDonate ? "You Can Donate Now" : "You Cannot Donate Yet"}
          </h3>
          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full transition-all duration-1000 ${
                stats.canDonate ? "bg-green-500" : "bg-orange-400"
              }`}
              style={{ width: `${stats.progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 text-right">
            {Math.round(stats.progress)}% Completed (90 Days)
          </p>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Blood Type",
            value: donor?.bloodType || "-",
            icon: <FaTint />,
            color: "text-red-500",
            bg: "bg-red-50",
          },
          {
            label: "Total Donations",
            value: donor?.donationsCount || 0,
            icon: <FaHeart />,
            color: "text-pink-500",
            bg: "bg-pink-50",
          },
          {
            label: "Last Donation",
            value: donor?.lastDonation
              ? new Date(donor.lastDonation).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "None",
            icon: <FaCalendarAlt />,
            color: "text-blue-500",
            bg: "bg-blue-50",
          },
          {
            label: "Status",
            value: stats.canDonate ? "Eligible" : "Not Eligible",
            icon: stats.canDonate ? <FaCheckCircle /> : <FaTimesCircle />,
            color: stats.canDonate ? "text-green-500" : "text-orange-500",
            bg: stats.canDonate ? "bg-green-50" : "bg-orange-50",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center text-center"
          >
            <div
              className={`${stat.bg} ${stat.color} p-3 rounded-xl mb-3 text-xl`}
            >
              {stat.icon}
            </div>
            <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold">
              {stat.label}
            </p>
            <p className="text-lg font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* NOTIFICATIONS */}
      {notifications.filter((n) => n.status === "Unread").length > 0 && (
        <NotificationsPanel notifications={notifications} />
      )}

      {/* ON THE WAY TIMELINE */}
      <OnTheWayTimeline
        requests={onTheWayRequests}
        hospitals={hospitals}
        donorId={user?.profileId}
        onConfirm={actions.acceptRequest}
        onCancel={actions.cancelRequest}
        isCancelling={actions.isCancelling}
      />

      {/* MAP & REQUESTS */}
      <NearbyRequestsSection
        compatibleRequests={compatibleRequests}
        availableRequests={availableRequests}
        donor={donor}
        mapRequests={mapRequests}
        stats={stats}
        actions={actions}
        hospitals={hospitals}
        hasActiveTrip={hasActiveTrip}
      />

      {/* DONATION HISTORY */}
      <DonationHistoryTable donationHistory={donationHistory} />
    </div>
  );
}
