"use client";
import "../app/styles/globals.css";
import { useState, useEffect, useRef } from "react";



export default function Home() {
  const videos = [
    "/videos/bagguyclip1.mp4",
    "/videos/bagguyclip3.mp4",
    "/videos/bagguycolors.mp4",
  ];

  const [currentVideo, setCurrentVideo] = useState(null); // Start with no video to prevent SSR mismatch
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    setCurrentVideo(videos[Math.floor(Math.random() * videos.length)]); // Set video only after mounting
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement && currentVideo) {
      videoElement.src = currentVideo;
      videoElement.muted = isMuted;
      videoElement.play().catch((error) =>
        console.log("Autoplay blocked:", error)
      );

      const handleVideoEnd = () => {
        let nextVideo;
        do {
          nextVideo = videos[Math.floor(Math.random() * videos.length)];
        } while (nextVideo === currentVideo);
        setCurrentVideo(nextVideo);
      };

      videoElement.addEventListener("ended", handleVideoEnd);

      return () => {
        videoElement.removeEventListener("ended", handleVideoEnd);
      };
    }
  }, [currentVideo, isMuted]);

  const toggleMute = () => setIsMuted((prev) => !prev);

  return (
    <div className="relative h-screen text-white m-0 p-0 overflow-hidden">
      {currentVideo && ( // Render video only when currentVideo is set to avoid hydration mismatch
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1] bg-black"
          autoPlay
          muted={isMuted}
          playsInline
        ></video>
      )}

<nav className="fixed top-5 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-3 px-4 w-full max-w-xs md:max-w-md lg:max-w-lg text-white text-base md:text-lg z-10">
  <a
    href="/"
    className="text-white px-3 py-2 border-2 border-black/50 rounded bg-black/60 text-base md:text-lg transition-all duration-300 ease-in-out hover:bg-black/80 hover:border-black/80"
  >
    Home
  </a>
  <a
    href="/booking"
    className="text-white px-3 py-2 border-2 border-black/50 rounded bg-black/60 text-base md:text-lg transition-all duration-300 ease-in-out hover:bg-black/80 hover:border-black/80"
  >
    Book DJ Bagguy
  </a>
</nav>


      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 w-full px-5">
        <h1 className="text-4xl mb-0">Welcome to DJ Bagguy</h1>
        <p className="text-xl mt-2">Your ultimate DJ experience.</p>
      </div>
      <button
  onClick={toggleMute}
  className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-2 border-2 border-black/50 rounded text-base md:text-lg z-10 cursor-pointer transition-all duration-300 ease-in-out hover:bg-black/80 hover:border-black/80"
>
  {isMuted ? "Unmute" : "Mute"}
</button>


    </div>
  );
}