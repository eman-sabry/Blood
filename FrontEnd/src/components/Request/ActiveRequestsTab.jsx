import ActiveRequestCard from "./ActiveRequests";

export default function ActiveRequestsTab({
  activeRequests = [],
  searchQuery = "",
}) {
  
  const filtered = activeRequests.filter((r) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.trim().toLowerCase();
    const matchesBlood = r.bloodTypeNeeded?.toLowerCase().includes(query);
    const matchesHospital = r.hospitalName?.toLowerCase().includes(query);

    return matchesBlood || matchesHospital;
  });

  return (
    <div className="space-y-4">
      {filtered.length > 0 ? (
        filtered.map((req) => <ActiveRequestCard key={req.id} request={req} />)
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-400">
            {searchQuery
              ? `No results found for "${searchQuery}"`
              : "No active requests at the moment"}
          </p>
        </div>
      )}
    </div>
  );
}
