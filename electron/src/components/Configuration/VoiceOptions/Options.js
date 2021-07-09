import React from 'react'
import { useState } from 'react';
import { Actions } from './Actions'

export default function Options() {
    const [file, setFile] = React.useState("");
    const [path, setPath] = React.useState('/')

    // Handles file upload event and updates state
    function handleUpload(event) {
        setFile(event.target.files[0]);
        setPath(file.path)

        // Add code here to upload file to server
        // ...
    }
    //actions
    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState("0");
    const [action, setAction] = useState('Show options');
    
    const toggle = () => setOpen(!open);

    //selected action
    function handleOnClick(item) {
        setSelection(item.id)
        setAction(item.value)
        setOpen(!open)
    }



    return (
        <div className='relative'>
            <div className="flex  flex-row w-auto rounded ml-2 mb-2 mt-2 overflow-hiddenshadow-2xl">
                <label htmlFor="myInput"><div className="animate-pulse cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-5 fill-current text-gray-400" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                    </svg>
                </div></label>
                <input id="myInput" type={"file"} style={{ display: 'none' }} onChange={handleUpload} />
                <button className="relative px-2 focus:outline-none" >

                    <span className="text-gray-500">
                        Select Files
                    </span>

                </button>



            </div>

            <div className="w-auto rounded overflow-hidden shadow-2xl">
                <p className="p-4 text-gray-500">Options</p>
                <div className="border-b-2 m-0"></div>
                <p className="p-4 text-gray-500">Select Action: </p>
                <div className="mr-8 ml-4">
                    <div className="relative">
                        <button tabIndex={0} className="bg-indigo-300 p-3 rounded text-white shadow-inner w-full focus:outline-none" onClick={() => toggle(!open)} onKeyPress={() => toggle(!open)}>
                            <span className="float-left text-white">{action}</span>
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

        </div>


    )
}
