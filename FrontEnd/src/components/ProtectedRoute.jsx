import { Navigate } from "react-router-dom";
import { useAuthUser } from "../Hooks/useAuthUser";
import { FaSpinner } from "react-icons/fa";

export default function ProtectedRoute({ children, role }) {
  const { data: user, isLoading } = useAuthUser();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-3xl" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
