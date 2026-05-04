
import { Link } from "react-router-dom";
import { UserAvatar } from "./UserAvatar";
import { useLogout } from "../Hooks/useLogout";

const ROLE_STYLE = {
  donor:    { label: "Donor",    bg: "bg-red-50",   text: "text-red-700"   },
  hospital: { label: "Hospital", bg: "bg-blue-50",  text: "text-blue-700"  },
  admin:    { label: "Admin",    bg: "bg-amber-50", text: "text-amber-700" },
};

const ROLE_PROFILE_PATH = {
  donor:    "/donor/profile",
  hospital: "/hospital/profile",
  admin:    "/admin/profile",
};

export function UserMenuButton({ user }) {
  const role = user?.role ?? "donor";
  const { label, bg, text } = ROLE_STYLE[role] ?? ROLE_STYLE.donor;
  const profilePath = ROLE_PROFILE_PATH[role] ?? "/profile";
  const logout = useLogout(user?.name, label);

  return (
    <div className="flex items-center gap-2">
      <Link
        to={profilePath}
        className="flex items-center gap-2.5 border border-gray-200 rounded-xl px-3 py-1.5 hover:bg-gray-50 transition-colors"
      >
        <UserAvatar image={user?.image} name={user?.name} role={role} />
        <div className="text-left hidden sm:block">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-gray-900">
              {user?.name}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${bg} ${text}`}
            >
              {label}
            </span>
          </div>
          <div className="text-xs text-gray-400">{user?.email}</div>
        </div>
      </Link>

      <button
        onClick={logout}
        className="flex items-center gap-1.5 border text-sm text-white bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 rounded-xl shadow-sm hover:opacity-90 transition-opacity "
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        <span className="hidden sm:inline">Log out</span>
      </button>
    </div>
  );
}