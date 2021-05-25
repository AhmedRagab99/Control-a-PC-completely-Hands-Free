import React from 'react'
import VideoCam from './VideoCam'
import { createPopper } from "@popperjs/core";
import { useHistory, Link } from "react-router-dom";

export default function WebcamControllingHome() {
    const history = useHistory();
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const btnDropdownRef = React.createRef();
    const popoverDropdownRef = React.createRef();
    const openDropdownPopover = () => {
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: "bottom-start"
        });
        setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };
    const routeChange = (path) => {
        history.push(path);
    }
    return (
        <div className="flex flex-no-wrap">

            <div className="w-64 absolute md:relative bg-gray-800 shadow h-screen flex-col justify-between hidden md:flex pb-12">
                <div className="px-8">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full sm:w-full px-4">
                            <img src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-4-470x470.png" alt="..." className="shadow-lg rounded-full max-w-full h-auto align-middle border-none" />
                        </div>
                    </div>
                    <ul className="mt-7">
                        <li className="SidebarButton mb-6">
                            <Link to='/webcam' className="flex items-center bg-gray-800 focus:text-gray-300 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-grid" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <rect x={4} y={4} width={6} height={6} rx={1} />
                                    <rect x={14} y={4} width={6} height={6} rx={1} />
                                    <rect x={4} y={14} width={6} height={6} rx={1} />
                                    <rect x={14} y={14} width={6} height={6} rx={1} />
                                </svg>
                                <span className="text-md ml-2" >Home</span>
                            </Link>
                        </li>

                        <li className="SidebarButton mb-6">
                            <Link className="flex items-center bg-gray-800 focus:text-gray-300 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <circle cx={12} cy={12} r={3} />
                                </svg>
                                <span className="text-md  ml-2">Configurations</span>
                            </Link>
                        </li>
                        <li className="flex w-full justify-between text-gray-500 cursor-pointer items-center focus:outline-none">
                            <button className="flex items-center focus:outline-none bg-gray-800 focus:text-gray-300" type="button"
                                ref={btnDropdownRef}
                                onClick={() => {
                                    dropdownPopoverShow
                                        ? closeDropdownPopover()
                                        : openDropdownPopover();
                                }}>
                                {dropdownPopoverShow ?
                                    (<svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" >
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                                    </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    )


                                }
                                <span className="text-sm ml-2">Controlling Options</span>


                            </button>
                            <div ref={popoverDropdownRef} className={
                                (dropdownPopoverShow ? "block " : "hidden ") +
                                "text-base z-50 float-left bg-gray-800 py-2 list-none text-left rounded shadow-md mt-1"
                            }
                            >
                                <ul>
                                    <li>
                                        <Link to='/webcam' className="flex py-2 px-7 hover:text-gray-300 items-center bg-gray-800 focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />

                                            </svg>
                                            <span className="text-xs  ml-2">Webcam</span>
                                        </Link>

                                    </li>
                                    <li>
                                        <Link to='/speech' className="flex py-2 px-7 hover:text-gray-300  bg-gray-800 items-center focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />

                                            </svg>

                                            <span className="text-xs  ml-2">Speech</span>

                                        </Link>
                                    </li>
                                </ul>


                            </div>

                        </li>

                    </ul>

                </div>
                <div className="px-2 border-t border-gray-700">
                    <button className="SidebarButton  focus:outline-none p-5" onClick={() => routeChange('/')} >
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
                            </svg>
                            <span className="text-md  ml-2">Logout</span>
                        </div>
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-1 h-64 md:w-4/5 w-11/12 ">
                <VideoCam />

            </div>
        </div>
    );
}
