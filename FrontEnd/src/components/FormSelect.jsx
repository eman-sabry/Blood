
const FormSelect = ({ register, options, error }) => (
  <div className="flex flex-col gap-1">
    <select
      {...register}
      className={`w-full px-4 py-2.5 border rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 transition
        ${error ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-red-300"}`}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-400 text-xs">{error}</p>}
  </div>
);

export default FormSelect;
