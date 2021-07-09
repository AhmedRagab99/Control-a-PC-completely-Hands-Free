import React from "react";
import SideBar from "../../SideBar/SideBar";
import Toggle from "../../Theme/Toggle";
import { useHistory } from "react-router-dom";
import Options from "./Options";

export default function VoiceOptions() {
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
                  Voice Configurations...
                </p>
                <div className="container">
                  <Options />
                </div>

                <div className="flex flex-row">
                  <button
                    className="setconfgbtn animate-bounce mt-2 "
                    onClick={() => routeChange("/option3")}
                  >
                    <span className="absolute  flex items-center ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      previous
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
