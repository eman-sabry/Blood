export default function ActiveRequests({ activeRequests, handleDelete }) {
  return (
    <div className="p-6">
    
      {/* HEADER ROW */}
      <div className="flex items-center justify-between px-4 py-2 mb-2 text-xs font-bold text-gray-400 uppercase border-b border-gray-100">
        <span>Type</span>
        <span>Units</span>
        <span>Status / Action</span>
      </div>

      <div className="space-y-3">
        {activeRequests?.length > 0 ? (
          activeRequests.map((req) => (
            <div
              key={req.id}
              className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition"
            >
              {/* TYPE */}
              <div className="font-bold text-red-600">
                {req.bloodTypeNeeded}
              </div>

              {/* UNITS */}
              <div className="text-gray-700 font-medium">
                {req.quantity} Units
              </div>

              {/* STATUS + ACTION */}
              <div className="flex items-center gap-3">
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

                {req.status === "Pending" && (
                  <button
                    onClick={() => handleDelete(req.id)}
                    className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm text-center mt-10">
            No requests yet
          </p>
        )}
      </div>
    </div>
  );
}
