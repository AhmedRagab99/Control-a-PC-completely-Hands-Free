import React from 'react'

export default function Options() {
    return (
        <section class="p-4 h-44 w-96 flex md:flex-row items-center justify-around bg-transparent flex-wrap sm:flex-col">
        <div class="h-20 w-24 relative cursor-pointer mb-5">
            <div class="absolute inset-0 bg-gray-100 opacity-25 rounded-lg shadow-2xl"></div>
            <div class="absolute inset-0 transform  hover:-rotate-45 transition duration-300">
                <div class="h-full w-full bg-gray-100 dark:bg-gray-200 dark:bg-opacity-30  rounded-lg shadow-xl">

                    <button className="confgoptionsbtn" onClick={''}>

                        <span className="mt-3 ml-14 italic animate-pulse">
                            Left Click
                        </span>

                    </button>
                    <div className="ml-9 animate-pulse">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-current text-gray-400 " viewBox="0 0 20 20" >
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clip-rule="evenodd" />
                        </svg>
                    </div>

                </div>

            </div>
        </div>
        <div class="h-20 w-24 relative cursor-pointer mb-5">
            <div class="absolute inset-0 bg-white opacity-25 rounded-lg shadow-2xl"></div>
            <div class="absolute inset-0 transform  hover:scale-75 transition duration-300">
                <div class="h-full w-full bg-gray-100 dark:bg-gray-200 dark:bg-opacity-30 rounded-lg shadow-xl">
                    <button className="confgoptionsbtn" onClick={''}>

                        <span className="mt-3 ml-14 italic animate-pulse">
                            Double Click
                        </span>

                    </button>
                    <div className="ml-9 animate-pulse">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-current text-gray-400 " viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div class="h-20 w-24 relative cursor-pointer mb-5">
            <div class="absolute inset-0 bg-white opacity-25 rounded-lg shadow-2xl"></div>
            <div class="absolute inset-0 transform  hover:rotate-45 transition duration-300">
                <div class="h-full w-full bg-gray-100 dark:bg-gray-200 dark:bg-opacity-30 rounded-lg shadow-xl">
                    <button className="confgoptionsbtn" onClick={''}>

                        <span className="mt-3 ml-14 italic animate-pulse">
                            Right Click
                        </span>

                    </button>
                    <div className="ml-9 animate-pulse">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-current text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>

    </section>

    )
}
