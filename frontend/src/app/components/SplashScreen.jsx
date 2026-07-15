"use client";

import { useEffect, useRef } from "react";

export default function SplashScreen({ onFinish }) {

  const videoRef = useRef(null);

  useEffect(() => {

    if (videoRef.current) {

      videoRef.current.play().catch(() => {});

    }

  }, []);

  return (

    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">

      <video
        ref={videoRef}
        className="w-full h-full object-contain md:object-cover"
        autoPlay
        muted
        playsInline
        onEnded={onFinish}
      >

        <source
          src="/videos/intro.mp4"
          type="video/mp4"
        />

      </video>

    </div>

  );

}