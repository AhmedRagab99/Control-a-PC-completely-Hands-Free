import { BrowserRouter, Link } from "react-router-dom";
import React from "react";
const W3CWebSocket = require('websocket').w3cwebsocket;

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: new String() };
        this.updateState = this.updateState.bind(this);
    }

    updateState(newValue) {
        this.setState({
            value: newValue
        });
    }

    componentWillMount() {
        this.initializeSocket()
    }

    initializeSocket() {
        const client = new W3CWebSocket('ws://localhost:8080');
        const context = this;
        client.onopen = function () {
            context.updateState('WebSocket Client Connected')
        };
        client.onmessage = function (message) {
            context.updateState(message.data.toString())
        };
        client.onclose = function () {
            context.updateState('WebSocket Client Connection Closed');
        };
    }

    render() {
        return (
            <div className="flex flex-no-wrap">
                {/* Sidebar starts */}
                {/* Remove class [ hidden ] and replace [ sm:flex ] with [ flex ] */}
                <div className="w-64 absolute lg:relative bg-gray-800 shadow h-screen flex-col justify-between hidden lg:flex pb-12">
                    <div className="px-8">
                        <ul className="mt-12">
                            <li className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-6">
                                <div className="flex items-center">
                                    <BrowserRouter>
                                        <Link to="" class="block px-4 ">
                                            <svg class="w-5 ml-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                        </Link>
                                    </BrowserRouter>
                                    <span>Home</span>
                                </div>
                            </li>


                            <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center">
                                <div className="flex items-center">
                                    <BrowserRouter>
                                        <Link to="" class="block px-5 ">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg></Link>
                                    </BrowserRouter>
                                    <span>Settings</span>
                                </div>
                            </li>
                        </ul>

                    </div>
                    <div className="px-8 border-t border-gray-700">
                        <ul className="w-full flex items-center justify-between bg-gray-800">
                            <li className="cursor-pointer text-white pt-5 pb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bell" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                                    <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                                </svg>
                            </li>
                            <li className="cursor-pointer text-white pt-5 pb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-messages" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                                    <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
                                </svg>
                            </li>
                            <li className="cursor-pointer text-white pt-5 pb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-settings" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <circle cx={12} cy={12} r={3} />
                                </svg>
                            </li>
                            <li className="cursor-pointer text-white pt-5 pb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-archive" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <rect x={3} y={4} width={18} height={4} rx={2} />
                                    <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" />
                                    <line x1={10} y1={12} x2={14} y2={12} />
                                </svg>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Sidebar ends */}
                {/* Remove class [ h-64 ] when adding a card block */}
                <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
                    {/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
                    <div className="w-full h-full rounded border-dashed border-2 border-gray-300">
                        <center>
                            <div>
                                <h1>### WebSocket Data ###</h1>
                                <h2>{this.state.value}</h2>
                            </div>
                        </center>
                    </div>
                </div>
            </div>
        );
    }
}

// function Navbar() {
//     return (
//         <div className="flex flex-no-wrap">
//             {/* Sidebar starts */}
//             {/* Remove class [ hidden ] and replace [ sm:flex ] with [ flex ] */}
//             <div className="w-64 absolute lg:relative bg-gray-800 shadow h-screen flex-col justify-between hidden lg:flex pb-12">
//                 <div className="px-8">
//                     <ul className="mt-12">
//                         <li className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-6">
//                             <div className="flex items-center">
//                                 <BrowserRouter>
//                                     <Link to="" class="block px-4 ">
//                                         <svg class="w-5 ml-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
//                                     </Link>
//                                 </BrowserRouter>
//                                 <span>Home</span>
//                             </div>
//                         </li>


//                         <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center">
//                             <div className="flex items-center">
//                                 <BrowserRouter>
//                                     <Link to="" class="block px-5 ">
//                                         <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                                         </svg></Link>
//                                 </BrowserRouter>
//                                 <span>Settings</span>
//                             </div>
//                         </li>
//                     </ul>

//                 </div>
//                 <div className="px-8 border-t border-gray-700">
//                     <ul className="w-full flex items-center justify-between bg-gray-800">
//                         <li className="cursor-pointer text-white pt-5 pb-3">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bell" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
//                                 <path stroke="none" d="M0 0h24v24H0z" />
//                                 <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
//                                 <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
//                             </svg>
//                         </li>
//                         <li className="cursor-pointer text-white pt-5 pb-3">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-messages" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
//                                 <path stroke="none" d="M0 0h24v24H0z" />
//                                 <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
//                                 <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
//                             </svg>
//                         </li>
//                         <li className="cursor-pointer text-white pt-5 pb-3">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-settings" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
//                                 <path stroke="none" d="M0 0h24v24H0z" />
//                                 <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                                 <circle cx={12} cy={12} r={3} />
//                             </svg>
//                         </li>
//                         <li className="cursor-pointer text-white pt-5 pb-3">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-archive" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
//                                 <path stroke="none" d="M0 0h24v24H0z" />
//                                 <rect x={3} y={4} width={18} height={4} rx={2} />
//                                 <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" />
//                                 <line x1={10} y1={12} x2={14} y2={12} />
//                             </svg>
//                         </li>
//                     </ul>
//                 </div>
//             </div>

//             {/* Sidebar ends */}
//             {/* Remove class [ h-64 ] when adding a card block */}
//             <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
//                 {/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
//                 <div className="w-full h-full rounded border-dashed border-2 border-gray-300">
//                     <center><h1>Hi</h1></center>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Navbar;
