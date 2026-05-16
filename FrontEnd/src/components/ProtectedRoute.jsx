import { Navigate } from "react-router-dom";
import { useAuthUser } from "../Hooks/useAuthUser";
import { FaSpinner } from "react-icons/fa";

export default function ProtectedRoute({ children, role }) {
  const { data: user, isLoading } = useAuthUser();

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">
          Loading....
        </p>
      </div>
    );
  }
  

  if (!user) return <Navigate to="/login" replace />;

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
