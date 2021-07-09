import React from "react";
import SideBar from "../../SideBar/SideBar";
import Toggle from "../../Theme/Toggle";
import Options from "./Options";
import { useHistory } from "react-router-dom";

export default function Option3() {
  const history = useHistory();
  const routeChange = (path) => {
    history.push(path);
  };
  return (
    <div className="flex flex-no-wrap">
      <SideBar />
      <div className="container bg-gray-800 mx-auto px-1 h-full md:w-4/5 w-11/12 ">
        <div>
          <div className="absolute top-0 right-0 p-2">
            <Toggle />
          </div>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex flex-col dark:border-gray-700  shadow-3xl rounded-lg justify-center sm:py-7">
            <div className="relative sm:max-w-xl sm:mx-auto">
              <p className="Text italic">
                Live Your Life To The Fullest, You Deserve it
              </p>
            </div>

            <div className="relative sm:max-w-xl sm:mx-auto">
              <div className="absolute inset-0  bg-gradient-to-r from-cyan-400 to-light-blue-500 dark:bg-gray-300 dark:bg-opacity-25  shadow-2xl transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
              <div className="relative px-3 py-4  bg-gray-100 dark:bg-gray-200  dark:bg-opacity-90 shadow-2xl sm:rounded-3xl sm:p-8">
                <p id={2} className=" text-gray-400 text-lg px-24 py-2 ">
                  Set Your Own Configuration ...
                </p>
                <div className="container">
                  <Options faceID="3" reaction="Open Your mouth to ..." />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
