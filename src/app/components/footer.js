import Link from "next/link";
import "../styles/globals.css"


export default function Footer() {
    return (
        <footer className="footer">
        {/* ==== Centered Link Row ==== */}
        <div className="footer-links">
            <Link href="/" className="footer-link">Home</Link>
            <Link href="/booking" className="footer-link">Booking</Link>
            <a
            href="https://instagram.com/_BagGuy_"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            >
            Instagram
            </a>
            <a
            href="https://twitch.tv/Dj_Bagguy_"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            >
            Twitch
            </a>
        </div>

        {/* ==== Copyright Line ==== */}
        <div className="footer-bottom">
        <p className="text-xs text-center text-white mt-2">© 2025 DJ Bagguy. All Rights Reserved.</p>
        </div>
        </footer>
    );
}