import React from 'react'
import Toggle from '../Theme/Toggle';
import welcome from "../static/office.json";
import lottie from "lottie-web";
export default function Home() {

    const [playing, setPlaying] = React.useState(false);


    const HEIGHT = 320;
    const WIDTH = 350;

    React.useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#app-logo"),
            animationData: welcome,
            renderer: "svg", // "canvas", "html"
            loop: true, // boolean
            autoplay: true, // boolean
        });
    }, [playing]);

    const startVideo = () => {
        setPlaying(true);

        navigator.getUserMedia(
            {
                video: true,
            },
            (stream) => {
                let video = document.getElementsByClassName('app__videoFeed')[0];
                if (video) {
                    video.srcObject = stream;
                }
            },
            (err) => console.error(err)
        );
    };

    const stopVideo = () => {
        setPlaying(false);
        
        let video = document.getElementsByClassName('app__videoFeed')[0];
        video.srcObject.getTracks()[0].stop();
    };

    return (
        <div>
            <div className="absolute top-0 right-0 p-2"><Toggle /></div>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex flex-col dark:border-gray-700  shadow-3xl rounded-lg justify-center sm:py-7">
                <div className='relative sm:max-w-xl sm:mx-auto'>
                    <p className='Text italic'>Live Your Life To The Fullest, You Deserve it</p>
                </div>

                <div className="relative sm:max-w-xl sm:mx-auto">
                    <div className="absolute inset-0  bg-gradient-to-r from-cyan-400 to-light-blue-500 dark:bg-gray-300 dark:bg-opacity-25  shadow-2xl transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                    <div className="relative px-3 py-4  bg-gray-100 dark:bg-gray-200  dark:bg-opacity-90 shadow-2xl sm:rounded-3xl sm:p-16">

                        {playing ? (<p className=" text-gray-400 ">You Can also Controlling Your PC by Speaking...</p>) : (<p className="text-gray-400 px-10 ">  Press Play To Start Controlling your Pc ...</p>)}
                        <div className="container">
                            {playing ? (
                                <video
                                height={HEIGHT}
                                width={WIDTH}
                                muted
                                autoPlay
                                className="app__videoFeed"
                            ></video>) : (<div id='app-logo' style={{ width:340, height:200 }}></div>
                            )}

                        </div>
                        

                        <div className="app__input">
                            {playing ? (
                                <button className="btn " onClick={stopVideo}>Pause
                                    <span className="absolute left-2 inset-y-0 flex items-center pl-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                        </svg>
                                    </span></button>
                            ) : (
                                <button className="btn" onClick={startVideo}>
                                    <span className="absolute left-2 inset-y-0 flex items-center pl-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                    Play
                                </button>
                            )}
                        </div>
                    </div>


                </div>
            </div>


        </div>
    )
}
