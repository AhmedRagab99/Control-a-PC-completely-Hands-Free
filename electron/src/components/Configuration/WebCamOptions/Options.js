import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {Actions} from './Actions'
const axios = require("axios");

export default function Options(props) {
    const [action, setActions] = useState(props.faceID);
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [selected_action, setSelected_action] = useState('Show options');
    
    const toggle = () => setOpen(!open);

    //selected action
    function handleOnClick(item) {
        setSelected_action(item.value)
        setActions(item.id)
        setOpen(!open)
    }


    const routeChange = () => {
        console.log("asdasdasd");
        if (props.faceID === "1") history.push("/option2");
        else if (props.faceID === "2") history.push("/option3");
        else if (props.faceID === "3") history.push("/Voption");
    };

    const reverseRouteChange = () => {
        if (props.faceID === "1") history.push("/setconfg");
        else if (props.faceID === "2") history.push("/option1");
        else if (props.faceID === "3") history.push("/option2");
    };

    const save = () => {
        console.log(props.faceID);
        axios
            .post(
                "http://localhost:8080/set_face_action",
                {
                    from: props.faceID,
                    to: action,
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"), //the token is a variable which holds the token
                    },
                }
            )
            .then((res) => {
                console.log(res.data);
                routeChange();
            })
            .catch((err) => console.log(err));
    };
    return (
        <div class="relative">
           <div className="relative w-auto rounded overflow-hidden shadow-xl">
                <p className="p-4 text-gray-500">{props.reaction}</p>
                <div className="border-b-2 m-0"></div>
                <p className="p-4 text-gray-500">Select Action: </p>
                <div className="mr-8 ml-4">
                    <div className="relative">
                        <button tabIndex={0} className="bg-indigo-300 p-3 rounded text-white shadow-inner w-full focus:outline-none" onClick={() => toggle(!open)} onKeyPress={() => toggle(!open)}>
                            <span className="float-left text-white">{selected_action}</span>
                            {open ? (<svg xmlns="http://www.w3.org/2000/svg" class="h-5 float-right fill-none  text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                            </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" class="h-5 float-right fill-none  text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>)}



                        </button>
                    </div>
                    <div class="rounded overflow-hidden shadow-md my-2 relative pin-t pin-l">
                        {open && (
                            <ul className="h-32 overflow-y-scroll ">
                                {Actions.map(item => (
                                    <li className="p-2 block text-gray-500 hover:bg-indigo-100 cursor-pointer focus:outline-none" key={item.id}>
                                        <button className='focus:outline-none' type="button" onClick={() => handleOnClick(item)}>
                                            <span>{item.value}</span>

                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}

                    </div>


                </div>
            </div>
           

            <div className="flex flex-row">
                <button
                    className="setconfgbtn right-10 mt-4 mb-2  animate-bounce "
                    onClick={() => {
                        reverseRouteChange();
                    }}
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
                <button
                    className="setconfgbtn mt-4 mb-2  animate-bounce "
                    onClick={() => {
                        save();
                        routeChange();
                    }}
                >
                    <span className="absolute left-40 flex items-center pl-4">
                        next
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 5l7 7-7 7M5 5l7 7-7 7"
                            />
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    );
}