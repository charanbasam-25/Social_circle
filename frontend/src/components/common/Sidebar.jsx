import React, { useState } from "react";
import { MdHomeFilled, MdMenu, MdClose } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Games from "../../pages/games";
import LanguageModifier from "./LangugaeChange";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", { method: "POST" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    onError: () => toast.error("Logout failed"),
  });

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  return (
    <div className="flex-col md:flex-row md:flex-[2_2_0] w-18 max-w-52">
      <div className="fixed bottom-0 left-0 md:sticky md:top-0 md:left-0 md:h-screen flex md:flex-col items-center border-gray-700 w-full ">
        <ul className="flex md:flex-col gap-3 bg-[#4eb84c] p-2 rounded-md w-full md:w-auto justify-around md:justify-start">
          <li className="flex justify-center md:justify-start bg-[#000000] rounded-md">
            <Link
              to="/"
              className="flex gap-3 items-center transition-all duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <MdHomeFilled className="w-8 h-8" />
              <span className="text-lg hidden md:block">{t("home")}</span>
            </Link>
          </li>

          <li className="flex justify-center md:justify-start bg-[#000000] rounded-md">
            <Link
              to="/notifications"
              className="flex gap-3 items-center transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <IoNotifications className="w-6 h-6" />
              <span className="text-lg hidden md:block">
                {t("notifications")}
              </span>
            </Link>
          </li>
          <li className="flex justify-center md:justify-start bg-[#000000] rounded-md">
            <Link
              to={`/profile/${authUser?.username}`}
              className="flex gap-3 items-center transition-all duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <FaUser className="w-6 h-6" />
              <span className="text-lg hidden md:block">{t("profile")}</span>
            </Link>
          </li>
          <li className="flex justify-center md:justify-start bg-[#000000] rounded-md">
            <Games navigate={navigate} />
          </li>
        </ul>

        {authUser && (
          <div className="hidden md:flex md:flex-col items-center md:items-start md:relative mt-auto mr-4 md:mr-0 md:mb-10">
            <div className="md:mb-4 mb-1 bg-[#4eb84c] rounded-md p-1">
              <LanguageModifier />
            </div>
            <div className="flex items-center bg-[#4eb84c] py-2 px-4 md:rounded-full rounded-md md:w-40 md:ml-4">
              <div className="hidden md:block">
                <p className="text-black font-bold text-sm w-20 truncate">
                  {t("logout")}
                </p>
              </div>
              <RiLogoutBoxFill
                className="w-5 h-5 cursor-pointer ml-2 md:ml-0"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
              />
            </div>
          </div>
        )}
      </div>
      {authUser && (
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#4eb84c] flex justify-around items-center p-2 z-50">
          <Link to="/" className="flex flex-col items-center">
            <MdHomeFilled className="w-6 h-6" />
            <span className="text-sm">{t("home")}</span>
          </Link>
          <Link to="/notifications" className="flex flex-col items-center">
            <IoNotifications className="w-6 h-6" />
            <span className="text-sm">{t("notifications")}</span>
          </Link>
          <Link
            to={`/profile/${authUser?.username}`}
            className="flex flex-col items-center"
          >
            <FaUser className="w-6 h-6" />
            <span className="text-sm">{t("profile")}</span>
          </Link>

          <div className="flex flex-col items-center">
            <MdMenu
              className="w-6 h-6 cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        </div>
      )}


      {isMenuOpen && (
        <div className="fixed bottom-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex flex-col">
          <div className="bg-white w-3/4 h-full p-5">
            <div className="flex justify-end">

              <MdClose
                className="w-6 h-6 bg-black cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              />
            </div>

            <Games navigate={navigate} />

            <div className="mt-4">
              <div
                className="flex items-center bg-[#4eb84c] py-2 px-4 rounded-md cursor-pointer"
                onClick={() => logout()}
              >
                <RiLogoutBoxFill className="w-5 h-5 mr-2" />
                <span className="text-sm">{t("logout")}</span>
              </div>
            </div>
          </div>
          <div
            className="flex-1"
            onClick={() => setIsMenuOpen(false)} 
          ></div>
          
        </div>
      )}
    </div>
  );
};

export default Sidebar;
