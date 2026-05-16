const StatCard = ({ title, value, icon: Icon, color = "bg-gray-500" }) => {
  const textColor =
    typeof color === "string" ? color.replace("bg-", "text-") : "text-gray-500";
  return (
    <div className="group bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden relative">
  
      <div
        className={`absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity ${textColor}`}
      >
        {Icon && <Icon size={100} />}
      </div>

      <div
        className={`p-4 rounded-2xl ${color} bg-opacity-10 text-2xl ${textColor} group-hover:scale-110 transition-transform relative z-10`}
      >
        {Icon && <Icon />}
      </div>

      <div className="relative z-10">
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">
          {title}
        </p>
        <h3 className="text-3xl font-black text-slate-800 tracking-tight">
          {value ?? 0}
        </h3>
      </div>
    </div>
  );
};
export default StatCard;