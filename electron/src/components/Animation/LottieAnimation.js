import Lottie from "lottie-web";
import React from 'react'

export default function LottieAnimation({lotti, width, height }) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: lotti,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
    
    return (
        <container>
        <Lottie options={defaultOptions} height={height} width={width} />
      </container>
    )
}
