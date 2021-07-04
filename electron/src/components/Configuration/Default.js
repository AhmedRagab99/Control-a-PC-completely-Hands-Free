import React from 'react'
import SideBar from '../SideBar/SideBar'
import Toggle from '../Theme/Toggle';
import { useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import lottie from "lottie-web";
import welcome from "../static/office.json";
import ImageSlider from '../SlideShow/ImageSlider';
import { SliderData } from '../SlideShow/SliderData'

export default function Default() {

    const [current, setCurrent] = useState(0);

    React.useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#app-logo"),
            animationData: welcome,
            renderer: "svg",
            loop: true,
            autoplay: true,
        });
    }, []);

    const length = SliderData.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(SliderData) || SliderData.length <= 0) {
        return null;
    }


    return (
        <div className="flex flex-no-wrap">

            <SideBar />

            <div className="container bg-gray-800 mx-auto px-1 h-full md:w-4/5 w-11/12 ">

                <div className="absolute top-0 right-0 p-2"><Toggle /></div>
                <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex flex-col dark:border-gray-700  shadow-3xl rounded-lg justify-center sm:py-7">
                    <div className='relative sm:max-w-xl sm:mx-auto'>
                        <p className='Text italic'>Live Your Life To The Fullest, You Deserve it</p>
                    </div>

                    <div className="relative sm:max-w-xl sm:mx-auto">
                        <div className="absolute inset-0  bg-gradient-to-r from-cyan-400 to-light-blue-500 dark:bg-gray-300 dark:bg-opacity-25  shadow-2xl transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                        <div className="relative px-12 py-2 bg-gray-100 dark:bg-gray-200  dark:bg-opacity-90 shadow-2xl sm:rounded-3xl sm:p-12">
                            <section className='relative flex-col  justify-center align-middle flex '>
                                <div className="px-14"> <div id='app-logo' style={{ width: 340, height: 200 }}></div>
                                </div>

                                <FaArrowAltCircleLeft className='absolute text-white text-2xl left-1 z-10 top-2/4 cursor-pointer transition duration-500 ease-in-out hover:bg-gray-700  bg-gray-800 h-7 w-7 rounded-full opacity-30 flex items-center justify-center' onClick={prevSlide} />
                                <FaArrowAltCircleRight className='absolute text-white text-2xl right-1 z-10 top-2/4 cursor-pointer transition duration-500 ease-in-out  hover:bg-gray-700 bg-gray-800 h-7 w-7 rounded-full opacity-30 flex items-center justify-center' onClick={nextSlide} />
                                {SliderData.map((slide, index) => {
                                    return (
                                        <div
                                            className={index === current ? 'opacity-100 transition duration-1000 ' : 'opacity-0 transition duration-1000 ease-out'}
                                            key={index}
                                        >
                                            {index === current && (

                                                <div className='relative flex justify-center'>
                                                    <p className='text-gray-800 text-lg italic'> {slide} </p>

                                                </div>



                                            )}
                                        </div>
                                    );
                                })}
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
