import { useDonorData } from "../Hooks/useDonorData";
import { useAuthUser } from "../Hooks/useAuthUser";
import { FaBell, FaCheck, FaCheckDouble, FaTrashAlt } from "react-icons/fa";

export default function NotificationsPage() {
  const { data: user } = useAuthUser();

  // نستخدم المعرف الموحد للمستخدم (سواء كان مستشفى أو متبرع)
  const currentUserId = user?.userId || user?.id;

  const { notifications = [], actions, loading } = useDonorData(currentUserId);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin h-10 w-10 border-b-2 border-red-600 rounded-full" />
      </div>
    );
  }

  // فلترة وترتيب الإشعارات
  const unread = notifications.filter((n) => n.status === "Unread");
  const read = notifications.filter((n) => n.status === "Read");
  const allNotifications = [...unread, ...read];

  return (
    <div className="min-h-screen p-4 md:p-6 mt-20 md:mt-0 bg-gray-50/50">
      {/* HEADER CARD */}
      <div className="max-w-4xl mx-auto bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-xl">
            <FaBell className="text-blue-600 text-xl" />
          </div>
          <div>
            <h2 className="font-bold text-2xl text-gray-800">Notifications</h2>
            <p className="text-sm text-gray-500">
              You have{" "}
              <span className="text-blue-600 font-bold">{unread.length}</span>{" "}
              unread messages
            </p>
          </div>
        </div>

        {unread.length > 0 && (
          <button
            onClick={() => actions.markAllAsRead?.()}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white text-xs px-6 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* NOTIFICATIONS LIST */}
      <div className="max-w-4xl mx-auto mt-6 space-y-3">
        {allNotifications.length === 0 ? (
          <div className="bg-white p-20 rounded-3xl border border-dashed border-gray-200 text-center">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBell className="text-gray-300 text-2xl" />
            </div>
            <p className="text-gray-400 font-medium">No notifications yet</p>
            <p className="text-xs text-gray-300 mt-1">
              We'll notify you when something important happens
            </p>
          </div>
        ) : (
          allNotifications.map((n) => {
            const isUnread = n.status === "Unread";

            return (
              <div
                key={n.id}
                className={`group flex justify-between items-center p-4 rounded-2xl border transition-all duration-300 ${
                  isUnread
                    ? "bg-blue-50/50 border-blue-100 shadow-sm"
                    : "bg-white border-gray-100 opacity-80"
                }`}
              >
                {/* LEFT SIDE: ICON & CONTENT */}
                <div className="flex items-start gap-4">
                  <div
                    className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${
                      isUnread ? "bg-blue-500 animate-pulse" : "bg-gray-300"
                    }`}
                  />
                  <div>
                    <p
                      className={`text-sm leading-relaxed ${isUnread ? "text-blue-900 font-semibold" : "text-gray-600"}`}
                    >
                      {n.message}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1.5 flex items-center gap-2">
                      {n.time ? new Date(n.time).toLocaleString() : "Just now"}
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE: ACTIONS */}
                <div className="flex items-center gap-2">
                  {isUnread ? (
                    <button
                      onClick={() => actions.markAsRead?.(n.id)}
                      className="bg-white text-blue-600 border border-blue-100 text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-all flex items-center gap-1 shadow-sm"
                    >
                      <FaCheck /> Mark Read
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 text-green-500 text-[10px] font-bold bg-green-50 px-2 py-1 rounded-md">
                      <FaCheckDouble />
                      <span>Seen</span>
                    </div>
                  )}

                  <button
                    onClick={() => actions.deleteNotification?.(n.id)}
                    className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <FaTrashAlt className="text-xs" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
