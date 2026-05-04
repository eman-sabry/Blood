import ActiveRequestCard from "./ActiveRequests";

export default function ActiveRequestsTab({
  activeRequests = [],
  searchQuery = "",
  
}) {
  const filtered = activeRequests.filter((r) => {
    if (!searchQuery) return true;

    return (
      r.bloodTypeNeeded?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.hospitalName?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-3">
      {filtered.length> 0 ? (
        filtered.map((req) => (
          <ActiveRequestCard
            key={req.id}
            request={req}
           
          />
        ))
      ) : (
        <p className="text-center text-gray-400 py-6">No active requests</p>
      )}
    </div>
  );
}
