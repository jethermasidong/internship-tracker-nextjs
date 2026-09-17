import './globals.css'
import { AnimatePresence } from 'framer-motion'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Outimein - An Internship Time Tracker",
  description: "Track your internships time in and time outs.",
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
        </body>
    </html>
  )
}