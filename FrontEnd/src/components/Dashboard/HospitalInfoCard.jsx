import { FaPhoneAlt, FaCheckCircle } from "react-icons/fa";

export default function HospitalInfoCard({ user }) {
  return (
    <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl">
          🏥
        </div>

        <div>
          <h4 className="text-xl font-bold">Verified Institution</h4>
          <p className="text-red-100 text-sm">
            License Number: {user?.licenseNumber || "N/A"}
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20">
          <p className="text-[10px] text-red-200 uppercase font-bold">
            Contact
          </p>
          <p className="text-sm font-medium flex items-center gap-2">
            <FaPhoneAlt size={10} /> {user?.phone || "N/A"}
          </p>
        </div>

        <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20">
          <p className="text-[10px] text-red-200 uppercase font-bold">
            System Status
          </p>
          <p className="text-sm font-medium flex items-center gap-2">
            <FaCheckCircle size={10} /> Operational
          </p>
        </div>
      </div>
    </div>
  );
}
