export default function AllRequests({ allRequests }) {
  return (
    <div className="p-6 mt-10 ">
      <h3 className="text-lg font-bold text-gray-800 mb-6">
        All Requests History
      </h3>

      {/* HEADER ROW */}
      <div className="flex items-center justify-between px-4 py-2 mb-2 text-xs font-bold text-gray-400 uppercase border-b border-gray-100 ">
        <span>Type</span>
        
        <span>Status</span>
        <span>Date</span>
      </div>

      <div className="space-y-3">
        {allRequests?.length > 0 ? (
          allRequests.map((req) => (
            <div
              key={req.id}
              className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl"
            >
              {/* TYPE */}
              <div className="font-bold text-red-600">
                {req.bloodTypeNeeded}
              </div>

            

              {/* STATUS */}
              <span
                className={`px-3 py-1 text-xs font-bold rounded-full
                ${
                  req.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : req.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {req.status}
              </span>

              {/* DATE */}
              <div className="text-xs text-gray-400">
                {new Date(req.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm text-center mt-10">
            No history yet
          </p>
        )}
      </div>
    </div>
  );
}
