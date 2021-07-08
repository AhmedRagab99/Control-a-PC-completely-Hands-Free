import React from "react";
import SideBar from "../SideBar/SideBar";
import Toggle from "../Theme/Toggle";
import { useHistory } from "react-router-dom";
import settings from "../static/42631-mechanical-engineering-setting.json";
import lottie from "lottie-web";

export default function Configuration() {
  const history = useHistory();
  const routeChange = (path) => {
    history.push(path);
  };

  React.useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#app-logo"),
      animationData: settings,
      renderer: "svg",
      loop: true,
      autoplay: true,
    });
  }, []);
  return (
    <div className="flex flex-no-wrap">
      <SideBar />

      <div className="container bg-gray-800 mx-auto px-1 h-full md:w-4/5 w-11/12 ">
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
            <div className="relative px-12 py-2 bg-gray-100 dark:bg-gray-200  dark:bg-opacity-90 shadow-2xl sm:rounded-3xl sm:p-14">
              <div className="px-14">
                <div id="app-logo" style={{ width: 125, height: 150 }}></div>
              </div>
              <button
                onClick={() => routeChange("/defaultconfg")}
                className="confgbtn"
              >
                Default
              </button>
              <button
                onClick={() => routeChange("/setconfg")}
                className="confgbtn"
              >
                Setup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
