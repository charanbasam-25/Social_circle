import { useState } from "react";

import Posts from "../../components/common/Posts/Posts";
import CreatePost from "./CreatePost";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const HomePage = () => {
  const [feedType, setFeedType] = useState("Curated");
  const { t } = useTranslation();
console.log("home-page-----")
  return (
    <>
      <div className="flex-[4_4_0] mr-auto  border-gray-700 min-h-screen">
        {/* Header */}
        <div className="flex w-full border-b items-center border-gray-700 bg-transparent text-[#000000] rounded-md  text-start mb-2">
          <div
            className={
              "flex justify-center flex-1 p-3  bg-gradient-to-r from-[#4eb84c] to-[#ffffff]  border-[#4eb84c] border-[2px] font-[cursive] rounded-md transition duration-300 cursor-pointer relative"
            }
            onClick={() => setFeedType("Curated")}
          >
            {t("circles_update")}
            {feedType === "forYou" && (
              <div className="absolute bottom-0 w-10  h-1 rounded-full bg-primary"></div>
            )}
          </div>
          <div className="bg-[#4eb84c] rounded-full w-12 h-12 mx-2 flex justify-center">
            <div className="flex justify-center md:justify-center md:items-center">
              <Link
                to="/"
                className="flex justify-center items-center md:justify-start animate-rotate-clockwise"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  width="34"
                  height="34"
                >
                  <circle cx="30" cy="30" r="10" fill="#1a103e" />
                  <circle cx="70" cy="30" r="10" fill="#1a103e" />
                  <circle cx="30" cy="70" r="10" fill="#1a103e" />
                  <circle cx="70" cy="70" r="10" fill="#1a103e" />
                  <line
                    x1="30"
                    y1="30"
                    x2="70"
                    y2="30"
                    stroke="#1a103e"
                    stroke-width="3"
                  />
                  <line
                    x1="30"
                    y1="30"
                    x2="30"
                    y2="70"
                    stroke="#1a103e"
                    stroke-width="3"
                  />
                  <line
                    x1="70"
                    y1="30"
                    x2="70"
                    y2="70"
                    stroke="#1a103e"
                    stroke-width="3"
                  />
                  <line
                    x1="30"
                    y1="70"
                    x2="70"
                    y2="70"
                    stroke="#1a103e"
                    stroke-width="3"
                  />
                  <text
                    x="50%"
                    y="50%"
                    font-family="Arial"
                    font-size="24"
                    text-anchor="middle"
                    fill="#1a103e"
                    dy="5"
                    className="text-white"
                  >
                    c
                  </text>
                </svg>
              </Link>
            </div>
          </div>

          <div
            className="flex justify-center flex-1 p-3  bg-gradient-to-r from-[#4eb84c] to-[#ffffff] border-[#4eb84c] border-[2px] font-[cursive] rounded-md transition duration-300 cursor-pointer relative"
            onClick={() => setFeedType("FriendsFeed")}
          >
            {t("friends_feed")}
            {feedType === "following" && (
              <div className="absolute bottom-0 w-10  h-1 rounded-full bg-primary"></div>
            )}
          </div>
        </div>

        {/*  CREATE POST INPUT */}
        <CreatePost />

        {/* POSTS */}
        <Posts feedType={feedType} />
      </div>
    </>
  );
};
export default HomePage;
