"use client";
import "../styles/globals.css"; 
import { useState, useEffect, useRef } from "react";

export default function Booking() {
    const videos = [
        "/videos/bagguyclip1.mp4",
        "/videos/bagguyclip3.mp4",
        "/videos/bagguycolors.mp4",
    ];

    const [currentVideo, setCurrentVideo] = useState(null);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        country: "usa",
        subject: "",
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        setCurrentVideo(videos[Math.floor(Math.random() * videos.length)]);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage("Booking request sent successfully!");
                setFormData({ firstname: "", lastname: "", country: "usa", subject: "" });
            } else {
                setMessage(result.error || "Failed to send booking request.");
            }
        } catch (error) {
            setMessage("Server error. Please try again.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Background Video */}
            {currentVideo && (
                <video
                    ref={videoRef}
                    className="absolute top-0 left-0 w-full h-full object-cover z-[-1] bg-black"
                    autoPlay
                    muted={isMuted}
                    playsInline
                ></video>
            )}

            {/* Navigation Bar */}
            <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 flex justify-center gap-3 px-4 w-full max-w-xs sm:max-w-md lg:max-w-lg text-white text-base sm:text-lg z-10">
                <a href="/" className="text-white px-3 py-2 border-2 border-black/50 rounded bg-black/60 text-base sm:text-lg transition-all duration-300 ease-in-out hover:bg-black/80 hover:border-black/80">
                    Home
                </a>
                <a href="/booking" className="text-white px-3 py-2 border-2 border-black/50 rounded bg-black/60 text-base sm:text-lg transition-all duration-300 ease-in-out hover:bg-black/80 hover:border-black/80">
                    Book DJ Bagguy
                </a>
            </nav>

            {/* Page Title */}
            <div className="absolute top-[12%] sm:top-[12%] left-1/2 transform -translate-x-1/2 text-center z-10 w-full px-5">
                <h1 className="text-3xl sm:text-4xl mb-4 text-white">Book DJ Bagguy</h1>
                <p>Fill out the form below to reserve your spot DJ Bagguy.</p>
            </div>

            {/* Booking Form */}
            <div className="absolute top-[30%] sm:top-[35%] left-1/2 transform -translate-x-1/2 bg-black/60 p-5 rounded w-[90%] sm:w-[450px] h-auto sm:h-[px] flex flex-col justify-evenly space-y-4 overflow-hidden">
                <form onSubmit={handleSubmit} className="h-full flex flex-col justify-evenly space-y-4">
                    <label htmlFor="fname" className="text-white">First Name</label>
                    <input
                        type="text"
                        id="fname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        placeholder="First Name .."
                        required
                        className="w-full p-2 mt-2 mb-4 border rounded"
                    />
                    
                    <label htmlFor="lname" className="text-white">Last Name</label>
                    <input
                        type="text"
                        id="lname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="Last Name .."
                        required
                        className="w-full p-2 mt-2 mb-4 border rounded"
                    />
                    
                    <label htmlFor="country" className="text-white">Country</label>
                    <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="w-full p-2 mt-2 mb-4 border rounded"
                    >
                        <option value="australia">Australia</option>
                        <option value="canada">Canada</option>
                        <option value="usa">USA</option>
                        <option value="uk">United Kingdom</option>
                    </select>
                    
                    <label htmlFor="subject" className="text-white">Subject</label>
                    <textarea
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Event Information."
                        style={{ height: "100px" }}
                        required
                        className="w-full p-2 mt-2 mb-4 border rounded"
                    ></textarea>
                    
                    <input type="submit" value="Submit" className="w-full p-3 bg-orange-500 text-white border border-orange-600 rounded hover:bg-orange-600" />
                </form>

                {/* Message */}
                {message && (
                    <div className="mt-4 text-center text-white">{message}</div>
                )}
            </div>

            {/* Mute/Unmute Button */}
            {/* <button
                onClick={toggleMute}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-2 border-2 border-black/50 rounded text-base sm:text-lg z-20 cursor-pointer transition-all duration-300 ease-in-out hover:bg-black/80 hover:border-black/80"
            >
                {isMuted ? "Unmute" : "Mute"}
            </button> */}
        </div>
    );
}
