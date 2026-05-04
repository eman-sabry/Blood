import {
 
  FaBell,
  
} from "react-icons/fa";
export default function NotificationsPanel({ notifications }) {
  const unread = notifications.filter((n) => n.status === "Unread");
  if (unread.length === 0) return null;
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-blue-100">
      <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center gap-2">
        <FaBell className="text-blue-500" />
        Notifications
        <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
          {unread.length}
        </span>
      </h3>
      <div className="space-y-3">
        {unread.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-xl text-sm border ${
              n.type === "thank_you"
                ? "bg-green-50 border-green-100 text-green-800"
                : "bg-blue-50 border-blue-100 text-blue-800"
            }`}
          >
            <p>{n.message}</p>
            <p className="text-[10px] text-gray-400 mt-1">
              {new Date(n.createdAt).toLocaleString("ar-EG")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
