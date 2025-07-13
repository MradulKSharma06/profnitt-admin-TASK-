'use client'

export default function AboutUs() {
    return (
        <section className="relative flex justify-center px-6 mt-16 z-10">
            {/* Glow Background */}
            <div className="absolute h-[550px] w-[550px] rounded-full bg-[radial-gradient(ellipse_at_center,theme(colors.indigo.900),#010725)] blur-[150px] bottom-[50%] right-[60%] z-0" />

            <div className="w-full md:w-1/2 border border-gray-500 rounded-xl p-6 md:p-10 text-center backdrop-blur-md bg-white/5 z-10">
                <h2 className="font-clashDisplay text-white font-black text-[30px] xs:text-[40px] sm:text-[50px] md:text-[60px] mb-2">
                    About Us.
                </h2>
                <p className="font-poppins text-cyan-400 text-base md:text-lg mb-4">
                    Want to know who we are?
                </p>
                <p className="font-poppins text-white text-base md:text-lg">
                    ProfNITT is the official Finance and Investment club of NIT Tiruchirapalli.
                    We are a close-knit community of finance enthusiasts from diverse backgrounds
                    who take an interest in finance, stock market, options, and quants to spread
                    the elegance of finance among the student community of NIT Trichy.
                </p>
            </div>
        </section>
    )
}
