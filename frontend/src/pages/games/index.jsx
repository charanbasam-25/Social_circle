import React from "react";
import { IoGameControllerOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const Games = () => {
  const { t } = useTranslation();

  return (
    <div className="dropdown w-full md:w-auto">
      <div
        tabIndex={0}
        role="button"
        className="flex gap-3 items-center justify-center md:justify-start bg-[#000000] rounded-md transition-all duration-300 py-2 px-4 cursor-pointer"
      >
        <IoGameControllerOutline className="w-6 h-6" />
        <span className="text-lg hidden md:block">{t("games")}</span>
      </div>
      <ul
  tabIndex={0}
  className="dropdown-content menu rounded-md w-52 p-2 shadow-sm bg-[#4eb84c] absolute 
    md:top-[100%] md:left-[100%] md:translate-x-[-100%] md:translate-y-0 
    top-[100%] left-[50%] transform -translate-x-[60%] translate-y-[100%] md:translate-x-0"
    style={{ zIndex: 9999 }}
>
        <li className="bg-base-100 my-1">
          <a href="/games/tictactoe">Tic Tac Toe</a>
        </li>
        <li className="bg-[#4eb84c]">
          <a href="#">Coming Soon....</a>
        </li>
      </ul>
    </div>
  );
};

export default Games;
