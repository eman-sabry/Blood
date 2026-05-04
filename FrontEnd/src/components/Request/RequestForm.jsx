import { FaPlus, FaHospital } from "react-icons/fa";

export default function RequestForm({
  user,
  form,
  setForm,
  handleSubmit,
  loading,
}) {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
          <FaHospital />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">
           Create Blood Request 
          </h2>
          <p className="text-sm text-gray-500">
            {user?.hospitalName || "Hospital"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={form.bloodTypeNeeded}
          onChange={(e) =>
            setForm({ ...form, bloodTypeNeeded: e.target.value })
          }
          className="w-full p-4 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-red-200"
          required
        >
          <option value="">Select Blood Type</option>
          {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Units (e.g 5)"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className="w-full p-4 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-red-200"
        />

        <button
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2"
        >
          <FaPlus />
          {loading ? "Creating..." : "Create Request"}
        </button>
      </form>
    </div>
  );
}
