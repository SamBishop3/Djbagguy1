"use client";
import "../styles/globals.css";
import Link from "next/link";


export default function Header() {
    return (
        <header className="w-full px-4 py-3 bg-black text-white flex justify-center items-center z-20 relative">
            <nav className="flex flex-wrap justify-center gap-6 text-sm sm:text-base">
            <Link
                href="/"
                className="hover:text-orange-400 transition duration-300"
            >
                Home
            </Link>
            <Link
                href="/booking"
                className="hover:text-orange-400 transition duration-300"
            >
                Booking
            </Link>
            <a
                href="https://www.instagram.com/chefonfire_dallas"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition duration-300"
            >
                Instagram
            </a>
            <a
                href="https://www.twitch.tv/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition duration-300"
            >
                Twitch
            </a>
            </nav>
        </header>
        );
    }