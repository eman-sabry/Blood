import { Link } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser";
import { UserMenuButton } from "./UserMenuButton";

export function StickyNavbar() {
  const { data: user } = useAuthUser();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between shadow-sm">
      {/* Logo */}
      <Link
        to="/"
        className="text-xl font-bold flex items-center gap-2 text-gray-900"
      >
        <span className="text-red-500 text-2xl">🩸</span>
        LifeDrop
      </Link>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">
        {/* USER */}
        {user?.status === "approved" ? (
          <UserMenuButton user={user} />
        ) : (
          <>
            <Link to="/login">
              <button className="text-sm text-gray-700 border border-gray-300 px-4 py-2 rounded-xl hover:bg-gray-50 transition">
                Log In
              </button>
            </Link>

            <Link to="/signup">
              <button className="text-sm text-white bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 rounded-xl shadow-sm hover:opacity-90 transition">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
