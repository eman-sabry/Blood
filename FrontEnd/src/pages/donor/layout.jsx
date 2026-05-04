import { NavLink, Outlet } from "react-router-dom";
import { FaUser, FaHome, FaHandHoldingHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDonorData } from "../../Hooks/useDonorData";
import { useAuthUser } from "../../Hooks/useAuthUser";
import { FaRegBell } from "react-icons/fa";
export default function DonorLayout() {
  const { data: user } = useAuthUser();
  const { notifications } = useDonorData(user?.uid || user?.firebase_uid);
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
        <h1 className="text-red-500 font-bold text-2xl mb-8">Donor Panel</h1>

        <nav className="flex flex-col gap-4 text-gray-600">
          <NavLink to="/donor/dashboard" className={linkClass}>
            <FaHome /> Dashboard
          </NavLink>
          <NavLink to="/donor/notifications" className={linkClass}>
            <div className="relative flex items-center gap-2">
              <FaRegBell className="text-lg" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              )}
              Notifications
            </div>
          </NavLink>

          <NavLink to="/donor/profile" className={linkClass}>
            <FaUser /> Profile
          </NavLink>

          <NavLink to="/donor/requests" className={linkClass}>
            <FaHandHoldingHeart /> Requests
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
