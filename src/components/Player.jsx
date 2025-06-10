import React, { useRef, useEffect } from "react";
import Hls from "hls.js";

export default function Player({ url }) {
  const videoRef = useRef();

  useEffect(() => {
    if (!url || !videoRef.current) return;
    let hls;
    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = url;
    }
    return () => {
      if (hls) hls.destroy();
    };
  }, [url]);

  if (!url) return null;

  return (
    <div className="player">
      <video ref={videoRef} controls width="100%" height="400" autoPlay />
    </div>
  );
}