import { Link } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser";
import { UserMenuButton } from "./UserMenuButton";

export function StickyNavbar() {
  const { data: user } = useAuthUser();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between shadow-sm">
      {/* Logo */}
      <Link to="/" className="flex items-center  group">
        <div className="w-12 h-12 flex-shrink-0">
          <img
            src="/logo2.png"
            alt="LifeDrop Icon"
            className="w-full h-full object-contain group-hover:scale-110 transition-all duration-500"
          />
        </div>
        <div className="flex flex-col items-center -space-y-3">
          <span
            className="text-3xl md:text-4xl text-gray-900 select-none mb-1" 
            style={{ fontFamily: "'Caveat', cursive", fontWeight: 700 }}
          >
            Life<span className="text-red-600">Drop</span>
          </span>

          <span
            className="text-lg md:text-xl text-red-600 select-none"
            style={{
              fontFamily: "'Changa', sans-serif",
              fontWeight: 800,
              letterSpacing: "-0.02em", 
              filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.05))", 
            }}
          >
            قطرة حياة
          </span>
        </div>
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
