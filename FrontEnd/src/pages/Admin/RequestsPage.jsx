import {
  FaHeartbeat,
  FaHistory,
  FaEllipsisV,
  FaTrashAlt,
} from "react-icons/fa";
import { useAdminData } from "../../Hooks/useAdminData";

export default function RequestsPage() {
  const { requests, history } = useAdminData();

  return (
    <div className="space-y-10">
      {/* Active Requests Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <span className="w-2 h-8 bg-red-500 rounded-full"></span> Live Blood
            Requests
          </h3>
          <span className="bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-bold">
            {requests.filter((r) => r.status === "Pending").length} Urgent Needs
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                <button className="text-gray-300 hover:text-red-500 transition">
                  <FaTrashAlt />
                </button>
              </div>
              <div className="flex items-start gap-5">
                <div className="bg-red-50 p-4 rounded-2xl text-red-500 font-black text-xl">
                  {req.bloodTypeNeeded}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-slate-800 uppercase tracking-tight">
                    {req.hospitalName}
                  </h4>
                  <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                    <FaHistory size={12} /> Requested on{" "}
                    {new Date(req.date).toLocaleDateString()}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-widest">
                      Status: {req.status}
                    </span>
                    <button className="text-red-500 text-xs font-bold underline hover:text-red-700">
                      Modify Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* History Log Section */}
      <section>
        <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
          <span className="w-2 h-8 bg-slate-800 rounded-full"></span> Global
          Donation Audit
        </h3>
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-white">
              <tr className="text-xs uppercase tracking-tighter">
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Donor UID</th>
                <th className="px-6 py-4">Destination Hospital</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Verified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-medium text-sm text-slate-600">
              {history.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-mono text-xs text-red-500">
                    #{log.id.slice(-8)}
                  </td>
                  <td className="px-6 py-4">{log.donorId}</td>
                  <td className="px-6 py-4 text-slate-900 font-bold">
                    {log.hospitalName}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(log.date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-green-500">
                    <FaCheckCircle />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
