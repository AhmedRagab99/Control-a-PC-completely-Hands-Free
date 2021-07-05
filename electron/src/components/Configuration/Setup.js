import React from 'react'
import SideBar from '../SideBar/SideBar'
import Toggle from '../Theme/Toggle';
import { useHistory } from "react-router-dom";


export default function Setup() {
    const history = useHistory();
    const routeChange = (path) => {
        history.push(path);
    }
    const HEIGHT = 320;
    const WIDTH = 350;

    return (
        <div className="flex flex-no-wrap">
            <SideBar />
            <div className="container bg-gray-800 mx-auto px-1 h-full md:w-4/5 w-11/12 ">
                <div>
                    <div className="absolute top-0 right-0 p-2"><Toggle /></div>
                    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex flex-col dark:border-gray-700  shadow-3xl rounded-lg justify-center sm:py-7">
                        <div className='relative sm:max-w-xl sm:mx-auto'>
                            <p className='Text italic'>Live Your Life To The Fullest, You Deserve it</p>
                        </div>

                        <div className="relative sm:max-w-xl sm:mx-auto">
                            <div className="absolute inset-0  bg-gradient-to-r from-cyan-400 to-light-blue-500 dark:bg-gray-300 dark:bg-opacity-25  shadow-2xl transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                            <div className="relative px-3 py-4  bg-gray-100 dark:bg-gray-200  dark:bg-opacity-90 shadow-2xl sm:rounded-3xl sm:p-16">

                                <p className=" text-gray-400 px-16 ">Set Your Own Configurations ...</p>
                                <div className="container">
                                    <video
                                        height={HEIGHT}
                                        width={WIDTH}
                                        muted
                                        autoPlay
                                        className="app__videoFeed"
                                    ></video>
                                </div>


                                <div className="flex flex-row">

                                    
                                    <button className="setconfgbtn animate-bounce " onClick={() => routeChange('/option1')}>

                                        <span className="absolute left-64 flex items-center pl-4">
                                            next
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                            </svg>
                                        </span>

                                    </button>
                                </div>
                            </div>


                        </div>
                    </div>


                </div>


            </div>
        </div>
    )
}