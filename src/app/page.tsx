'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="bg-[#010725] text-white overflow-x-hidden min-h-screen">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  )
}
