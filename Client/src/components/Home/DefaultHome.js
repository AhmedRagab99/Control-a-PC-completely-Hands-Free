import React from 'react'
import Home from './Home'
import SideBar from '../SideBar/SideBar'



export default function DefaultHome() {
    
    return (
        <div className="flex flex-no-wrap">
            <SideBar/>
 
            <div className="container bg-gray-800 mx-auto px-1 h-full md:w-4/5 w-11/12 ">
             <Home/>
               
            </div>
        </div>
    );
}

