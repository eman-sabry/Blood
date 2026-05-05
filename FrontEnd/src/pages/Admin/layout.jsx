import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaUser,
  FaHome,
  FaHistory,
  FaTint,
  FaBars,
  FaTimes,
  FaUsersCog,
} from "react-icons/fa";

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false); // حالة القائمة في الموبايل

  const toggleSidebar = () => setIsOpen(!isOpen);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-red-50 text-red-600 font-bold shadow-sm"
        : "text-gray-600 hover:bg-gray-50 hover:text-red-500"
    }`;

  return (
    <div className="flex flex-col md:flex-row min-h-screen mt-16 md:mt-20 bg-gray-50">
      {/* Mobile Header - يظهر فقط في الشاشات الصغيرة */}
      <div className="md:hidden flex items-center justify-between bg-white p-4 border-b border-gray-200 fixed top-16 left-0 w-full z-50 h-16">
        <h1 className="text-red-500 font-bold text-xl">Admin Panel</h1>
        <button
          onClick={toggleSidebar}
          className="text-black text-xl focus:outline-none"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 p-5 transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          pt-36 md:pt-5
        `}
      >
        <h1 className="hidden md:block text-red-500 font-bold text-2xl mb-8">
          Admin Panel
        </h1>

        <nav className="flex flex-col gap-2">
          <NavLink
            to="/admin/dashboard"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            <FaHome /> Dashboard
          </NavLink>

          <NavLink
            to="/admin/profile"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            <FaUser /> Profile
          </NavLink>

          <NavLink
            to="/admin/users"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            <FaUsersCog /> Users Management
          </NavLink>

          <NavLink
            to="/admin/History"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            <FaHistory /> Donation History
          </NavLink>

          <NavLink
            to="/admin/Requests"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            <FaTint /> Blood Requests
          </NavLink>
        </nav>
      </aside>

      {/* Overlay للموبايل (يغلق القائمة عند الضغط خارجها) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Content Area */}
      <main className="flex-1 p-4 md:p-8 w-full overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
