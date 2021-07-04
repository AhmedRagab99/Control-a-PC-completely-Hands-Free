import React from 'react'

export default function SlideShow() {
    const colors = ["#0088FE", "#00C49F", "#FFBB28"];
    const delay = 2500;
    const [index, setIndex] = React.useState(0);
    const timeoutRef = React.useRef(null);
    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

    }
    React.useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === colors.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );
        return () => {
            resetTimeout();
        };
    }, [index, colors.length]);

    return (
        <div className="w-52 overflow-hidden ">
            <div
                className="transition ease-out duration-500"
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
                {colors.map((backgroundColor, index) => (
                    <div
                        className="h-40 w-full rounded-md"
                        key={index}
                        style={{ backgroundColor }}
                    ></div>
                ))}
            </div>

            <div className="text-center">
                {colors.map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-20 w-20 rounded-xl inline-block cursor-pointer bg-gray-400${index === idx ? "bg-gray-800" : ""}`}
                        onClick={() => {
                            setIndex(idx);
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
}

