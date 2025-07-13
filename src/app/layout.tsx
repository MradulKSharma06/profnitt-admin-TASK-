import type { Metadata } from 'next'
import {
  Quicksand,
  Montserrat,
  Poppins,
  Lato,
} from 'next/font/google'
import './globals.css'
import { Providers } from './providers' 

// Load fonts
const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-quicksand',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-montserrat',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-lato',
})

export const metadata: Metadata = {
  title: 'ProfNITT Admin Panel',
  description:
    'Admin dashboard for managing events, projects, team members, and gallery for the ProfNITT club at NIT Trichy.',
  icons: {
    icon: 'https://res.cloudinary.com/dz31stmeh/image/upload/v1752312212/favicon_pf4wyg.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable} ${montserrat.variable} ${poppins.variable} ${lato.variable} dark`}
    >
      <body className="bg-background text-foreground font-sans min-h-screen antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
