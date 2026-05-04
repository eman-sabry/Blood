
import { useAuthUser } from "../hooks/useAuthUser";
import { UserMenuButton } from "./UserMenuButton";

export default function UserMenu() {
 const { user, isLoading } = useAuthUser();

  if (isLoading)
    return <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />;
  if (!user) return null;

  return <UserMenuButton user={user} />;
}
