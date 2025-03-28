"use client";
import "../styles/globals.css";
import { useState, useEffect, useRef } from "react";
import { sendEmail } from "../api/email/route";
import Footer from "../components/footer";

export default function Booking() {
    const videos = [
        "/videos/bagguyclip1.mp4",
        "/videos/bagguyclip3.mp4",
        "/videos/bagguycolors.mp4",
    ];

    const [currentVideo, setCurrentVideo] = useState(null);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
        const result = await sendEmail(formData);
        if (result.success) {
            alert("Your booking request has been sent successfully!");
            event.target.reset();
        } else {
            alert(`Error: ${result.error}`);
        }
        } catch (error) {
        console.error("Error during form submission:", error);
        alert("There was an error submitting your form. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col text-white overflow-hidden relative">
        {/* Background Video */}
        {currentVideo && (
            <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
            autoPlay
            muted={isMuted}
            playsInline
            ></video>
        )}

        Page Content
        <main className="flex-grow relative pb-32">
            {/* Navigation Bar */}
            <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 flex justify-center gap-3 px-4 w-full max-w-xs sm:max-w-md lg:max-w-lg z-10">
            {/* <a
                href="/"
                className="text-white px-3 py-2 border-2 border-black/50 rounded bg-black/60 text-base sm:text-lg hover:bg-black/80 hover:border-black/80 transition-all"
            >
                Home
            </a>
            <a
                href="/booking"
                className="text-white px-3 py-2 border-2 border-black/50 rounded bg-black/60 text-base sm:text-lg hover:bg-black/80 hover:border-black/80 transition-all"
            >
                Book DJ Bagguy
            </a> */}
            </nav>

            {/* Title */}
            <div className="pt-32 text-center px-4 z-10">
            <h1 className="text-3xl sm:text-4xl mb-2">Book DJ Bagguy</h1>
            <p>Fill out the form below to reserve your spot.</p>
            </div>

            {/* Form */}
            <div className="mt-10 flex justify-center z-10 px-4">
            <form
                className="w-full max-w-md bg-black/60 p-6 rounded space-y-4"
                onSubmit={handleSubmit}
            >
                <div>
                <label htmlFor="fname" className="block mb-1">
                    Name
                </label>
                <input
                    type="text"
                    id="fname"
                    name="fullname"
                    placeholder="Name .."
                    required
                    className="w-full p-2 border rounded text-black"
                />
                </div>

                <div>
                <label htmlFor="lname" className="block mb-1">
                    Email Address
                </label>
                <input
                    type="text"
                    id="lname"
                    name="senderEmail"
                    placeholder="Email .."
                    required
                    className="w-full p-2 border rounded text-black"
                />
                </div>

                <div>
                <label htmlFor="country" className="block mb-1">
                    Country
                </label>
                <select
                    id="country"
                    name="country"
                    required
                    className="w-full p-2 border rounded text-black"
                >
                    <option value="australia">Australia</option>
                    <option value="canada">Canada</option>
                    <option value="usa">USA</option>
                    <option value="uk">United Kingdom</option>
                </select>
                </div>

                <div>
                <label htmlFor="subject" className="block mb-1">
                    Booking Info ..
                </label>
                <textarea
                    id="subject"
                    name="message"
                    placeholder="Event Information."
                    style={{ height: "100px" }}
                    required
                    className="w-full p-2 border rounded text-black"
                ></textarea>
                </div>

                <input
                type="submit"
                value="Submit"
                className="w-full p-3 bg-orange-500 text-white border border-orange-600 rounded hover:bg-orange-600"
                />
            </form>
            </div>
        </main>

        {/* Footer */}
        <Footer />
        </div>
    );
}
