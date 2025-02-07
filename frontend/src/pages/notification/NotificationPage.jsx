import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import LoadingSpinner from "../../components/common/LoadingSpinner";

import { IoSettingsOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

import { useTranslation } from "react-i18next";

const NotificationPage = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/notifications");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  const { mutate: deleteNotifications } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/notifications", {
          method: "DELETE",
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Notifications deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <>
      <div className="flex-[4_4_0]   border-gray-700 min-h-screen">
        <div className="flex flex-col">
          <div className="flex justify-between gap-10 h-20 px-4 py-2 items-center  bg-[#4eb84c] mb-4 rounded-md">
            <p className="font-bold">Notifications</p>
          </div>
          {isLoading && (
            <div className="flex justify-center h-full items-center">
              <LoadingSpinner size="lg" />
            </div>
          )}
          {notifications?.length === 0 && (
            <div className="text-center p-4 font-bold">No notifications 🤔</div>
          )}
          {notifications?.map((notification) => (
            <div
              className="border-[#4eb84c] border-2 rounded-md mb-1"
              key={notification._id}
            >
              <div className="flex gap-2 p-4">
                {notification.type === "follow" && (
                  <FaUser className="w-7 h-7 text-primary" />
                )}
                {notification.type === "like" && (
                  <FaHeart className="w-7 h-7 text-red-500" />
                )}
                <Link to={`/profile/${notification.from.username}`}>
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img
                        src={
                          notification.from.profileImg ||
                          "/avatar-placeholder.png"
                        }
                      />
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <span className="font-bold">
                      @{notification.from.username}
                    </span>{" "}
                    {notification.type === "follow"
                      ? "followed you"
                      : t("liked_your_post")}
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default NotificationPage;
