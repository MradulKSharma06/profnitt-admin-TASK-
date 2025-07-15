'use client'

import { Mail, Linkedin, Github } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="w-full bg-[#080b2d] border-t border-gray-700 text-white py-10 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
                {/* Left Side: Logo and Club Description */}
                <div className="flex flex-col space-y-3 max-w-md">
                    <h3 className="text-2xl font-bold text-indigo-400">ProfNITT</h3>
                    <p className="text-sm text-gray-300">
                        The official Finance and Investment Club of NIT Tiruchirappalli.
                        Exploring the world of Quant, Markets, and Research.
                    </p>
                </div>

                {/* Right: Contact & Social */}
                <div className="flex flex-col space-y-3">
                    <h4 className="font-semibold text-lg">Connect with us</h4>
                    <div className="flex space-x-4">
                        <a href="mailto:club@nitt.edu" className="hover:text-indigo-400" aria-label="Mail">
                            <Mail size={20} />
                        </a>
                        <a href="https://github.com/ProfNITT" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400" aria-label="GitHub">
                            <Github size={20} />
                        </a>
                        <a href="https://linkedin.com/in/profnitt" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400" aria-label="LinkedIn">
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} ProfNITT. All rights reserved.
            </div>
        </footer>
    )
}
