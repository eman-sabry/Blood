import { NavLink, Outlet } from "react-router-dom";
import {
  FaUserInjured,
  FaHome,
  FaHospital,
  FaTint,
  FaListAlt,
} from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { useHospitalData } from "../../Hooks/useHospitalData";
import { useAuthUser } from "../../Hooks/useAuthUser";
import { FaRegBell } from "react-icons/fa";
import {
  FaHandHoldingMedical,
  FaClipboardList,
  FaFileMedical,
} from "react-icons/fa";
export default function HospitalLayout() {
  const { data: user } = useAuthUser();
const { notifications } = useHospitalData(user?.userId);
  const unreadCount =
    notifications?.filter((n) => n.status === "Unread")?.length || 0;
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
      isActive
        ? "bg-red-100 text-red-600 font-semibold"
        : "text-gray-600 hover:text-red-500"
    }`;

  return (
    <div className="flex min-h-screen mt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-5">
        <h1 className="text-red-500 font-bold text-2xl mb-8">Hospital Panel</h1>

        <nav className="flex flex-col gap-2">
          <NavLink to="/hospital/dashboard" className={linkClass}>
            <FaHome /> Dashboard
          </NavLink>

          <NavLink to="/hospital/profile" className={linkClass}>
            <FaHospital /> Profile
          </NavLink>
          <NavLink to="/hospital/notifications" className={linkClass}>
            <div className="relative flex items-center gap-2">
              <FaRegBell className="text-lg" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              )}
              Notifications
            </div>
          </NavLink>
          <NavLink to="/hospital/stock" className={linkClass}>
            <FaTint /> Stock
          </NavLink>
          <NavLink to="/hospital/Donation-History" className={linkClass}>
            <FaHistory />
            Donation History
          </NavLink>

          <NavLink to="/hospital/create-request" className={linkClass}>
            <FaListAlt /> Create Request
          </NavLink>
          <NavLink to="/hospital/Donation-management" className={linkClass}>
            <FaFileMedical /> Donation Manage
          </NavLink>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
