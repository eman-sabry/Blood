import { NavLink, Outlet } from "react-router-dom";
import { FaUser, FaCheck, FaHome } from "react-icons/fa";``
import { Link } from "react-router-dom";

export default function AdminLayout() {
    const linkClass = ({ isActive }) =>
      `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
        isActive
          ? "bg-red-100 text-red-600 font-semibold"
          : "text-gray-600 hover:text-red-500"
      }`;
  return (
    <div className="flex min-h-screen mt-20">
      <aside className="w-64 bg-white border-r border-gray-200 p-5 ">
        <h1 className=" text-red-500 font-bold text-xl mb-8">Admin Panel</h1>

        <nav className="flex flex-col gap-4 text-gray-600">
          <NavLink to="/admin/dashboard" className={linkClass}>
            <FaHome /> Dashboard
          </NavLink>

          <NavLink to="/admin/users" className={linkClass}>
            <FaUser /> Users
          </NavLink>

          <NavLink to="/admin/approvals" className={linkClass}>
            <FaCheck /> Approvals
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
