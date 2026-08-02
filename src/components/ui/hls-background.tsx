"use client";

import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

interface HLSBackgroundProps {
  url: string;
}

export function HLSBackground({ url }: HLSBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        capLevelToPlayerSize: true,
        maxBufferLength: 30,
      });
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => { /* Auto-play prevented by browser, safe to ignore */ });
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // For Safari native HLS support
      video.src = url;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch(() => { /* Auto-play prevented by browser, safe to ignore */ });
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [url]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black pointer-events-none">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2"
      />
      {/* Dark overlay to match image */}
      <div className="absolute inset-0 bg-black/40" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#09090B] to-transparent" />
    </div>
  );
}
