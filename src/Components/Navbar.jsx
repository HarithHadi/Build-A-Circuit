import { useState } from "react";
import {Link, useLocation} from "react-router-dom";

const links = [
    { label: "Home", to: "/"},
    { label: "Lesson", to: "/lesson"},
    { label: "Builder", to: "/builder"},
    { label: "Challenge", to: "/challenge"},
    { label: "Quiz", to: "/quiz"},
];


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">

                {/* Brand */}
                <span className="text-lg font-bold text-[#9fcdff]">Build-A-Circuit</span>

                {/* Desktop Links */}
                <ul className="hidden md:flex items-center gap-1">
                    {links.map(({label, to}) =>(
                        <li key={to}>
                            <Link
                                to={to}
                                className="font-semibold px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Hamburger (mobile) */}
                <button
                    className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isOpen
                        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        }
                    </svg>
                </button>
            </div>
            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden border-t border-gray-100 px-4 py-3 flex flex-col gap-1">
                {links.map(({ label, to }) => (
                    <Link
                    key={to}
                    to={to}
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 font-bold"
                    >
                    {label}
                    </Link>
                ))}
                </div>
            )}


        </nav>
    )
}
