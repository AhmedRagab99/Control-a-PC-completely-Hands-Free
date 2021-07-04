import React from 'react'
import VideoCam from './VideoCam'
import SideBar from '../SideBar/SideBar'
export default function WebcamControllingHome() {
    
    return (
        <div className="flex flex-no-wrap">
            <SideBar/>
            <div className="container bg-gray-800 mx-auto px-1 h-full md:w-4/5 w-11/12 ">
             <VideoCam/>
               
            </div>
        </div>
    );
}

