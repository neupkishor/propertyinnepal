"use client";

import { useEffect, useRef } from "react";

type HeroBackgroundVideoProps = {
  className?: string;
  src: string;
};

export function HeroBackgroundVideo({ className = "", src }: HeroBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {
        // Browsers can still block autoplay in low-power or data-saver modes.
      });
    }
  }, []);

  return (
    <video
      ref={videoRef}
      aria-hidden="true"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className={className}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

export default HeroBackgroundVideo;
