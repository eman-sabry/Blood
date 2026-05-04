import { FaPlus, FaMinus } from "react-icons/fa";

export default function StockControl({
  selectedType,
  setSelectedType,
  units,
  setUnits,
  mode,
  setMode,
  handleSubmit,
}) {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-10 space-y-5">
        <div>
          <h2 className="font-bold text-gray-800">Stock Control</h2>
          <p className="text-xs text-gray-500">Increase or decrease units</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-gray-100"
        >
          {/* TYPE */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full border p-3 rounded-xl"
            required
          >
            <option value="">Select Blood Type</option>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          {/* MODE */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMode("add")}
              className={`flex-1 p-2 rounded-xl font-bold flex items-center justify-center gap-2 ${
                mode === "add" ? "bg-green-500 text-white" : "bg-gray-100"
              }`}
            >
              <FaPlus /> Add
            </button>

            <button
              type="button"
              onClick={() => setMode("minus")}
              className={`flex-1 p-2 rounded-xl font-bold flex items-center justify-center gap-2 ${
                mode === "minus" ? "bg-red-500 text-white" : "bg-gray-100"
              }`}
            >
              <FaMinus /> Remove
            </button>
          </div>

          {/* UNITS */}
          <input
            type="number"
            placeholder="Units..."
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            className="w-full border p-3 rounded-xl"
            required
          />

          {/* SUBMIT */}
          <button
            className={`w-full text-white font-bold p-3 rounded-xl flex items-center justify-center gap-2 ${
              mode === "add"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {mode === "add" ? <FaPlus /> : <FaMinus />}
            {mode === "add" ? "Add Units" : "Remove Units"}
          </button>
        </form>
      </div>
    </div>
  );
}
