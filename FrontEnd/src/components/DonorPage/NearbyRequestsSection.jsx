import { FaMapMarkerAlt, FaLock } from "react-icons/fa";
import { DonorMap } from "../DonorMap";
import BloodRequestCard from "./BloodRequestCard";

export default function NearbyRequestsSection({
  compatibleRequests,
  availableRequests,
  donor,
  mapRequests,
  stats,
  actions,
  hasActiveTrip,
}) {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Map */}
      <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg flex items-center gap-2 text-gray-800">
            <FaMapMarkerAlt className="text-red-500" />
            Nearby Compatible Requests
          </h3>

          <span className="text-xs font-medium text-red-500 bg-red-50 px-3 py-1 rounded-full animate-pulse">
            {compatibleRequests.length} Requests
          </span>
        </div>

        <div className="rounded-2xl overflow-hidden border border-gray-100 h-[400px]">
          <DonorMap lat={donor?.lat} lng={donor?.lng} requests={mapRequests} />
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex flex-col">
        <h3 className="font-bold text-lg mb-2 text-gray-800">Blood Requests</h3>

        {!stats.canDonate && (
          <div className="mb-4 flex items-center gap-2 text-xs bg-orange-50 text-orange-600 border border-orange-100 rounded-xl px-3 py-2">
            <FaLock />
            You can view requests, but you cannot accept them until your waiting
            period ends
          </div>
        )}

        <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2">
          {availableRequests.length > 0 ? (
            availableRequests.map((r) => (
              <BloodRequestCard
                key={r.id}
                request={r}
                canDonate={stats.canDonate}
                onDonate={actions.acceptRequest}
                isAccepting={actions.isAccepting}
                donor={donor}
                hasActiveTrip={hasActiveTrip}
              />
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-400 text-sm italic">
                No nearby compatible requests available at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
