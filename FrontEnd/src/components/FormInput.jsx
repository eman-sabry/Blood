
const FormInput = ({ register, placeholder, type = "text", error, label }) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label className="text-xs text-gray-400 font-medium">{label}</label>
    )}
    <input
      {...register}
      type={type}
      placeholder={placeholder}
      className={`w-full px-4 py-2.5 border rounded-xl text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 transition
        ${error ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-red-300"}`}
    />
    {error && <p className="text-red-400 text-xs">{error}</p>}
  </div>
);

export default FormInput;
