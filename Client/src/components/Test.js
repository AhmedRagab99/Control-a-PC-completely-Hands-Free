import React from 'react'

export default function Test() {
    const [playing, setPlaying] = React.useState(false);

    const HEIGHT = 285;
    const WIDTH = 285;

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
            <div class="min-h-screen bg-gray-100 flex flex-col shadow-inner drop-shadow-2xl rounded-md justify-center sm:py-7">
                <div className = 'relative sm:max-w-xl sm:mx-auto'>
                <p className='Text'>Live Your Life To The Fullest, You Deserve it</p>
                </div>
                
                <div class="relative sm:max-w-xl sm:mx-auto">
                    <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-2xl transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                    <div class="relative px-4 py-4  bg-white shadow-2xl sm:rounded-3xl sm:p-16">

                        {playing ? (<p className=" text-gray-400 px-10 ">Start Controlling Your PC</p>) : (<p className="text-gray-400">Press Play To Start Controlling your Pc</p>)}
                        <div className="app__container">
                            <video
                                height={HEIGHT}
                                width={WIDTH}
                                muted
                                autoPlay
                                className="app__videoFeed"
                            ></video>
                        </div>
                        <div className="app__input">
                            {playing ? (
                                <button className="btn" onClick={stopVideo}>Pause
                                    <span className="absolute left-2 inset-y-0 flex items-center pl-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                        </svg>
                                    </span></button>
                            ) : (
                                <button className="btn" onClick={startVideo}>
                                    <span className="absolute left-2 inset-y-0 flex items-center pl-3">
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
