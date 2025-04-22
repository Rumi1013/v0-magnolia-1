import type React from "react"
import "./globals.css"
import { Inter, Playfair_Display, Lora } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Toaster } from "@/components/ui/toaster"
import { MusicPlayerProvider } from "@/context/MusicPlayerContext"
import PersistentMusicPlayer from "@/components/PersistentMusicPlayer"
import type { Metadata } from "next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Midnight Magnolia | Southern Heritage & Digital Creativity",
  description:
    "Digital-first creative brand transforming art, design, and strategy into sustainable income streams while honoring Southern heritage and Black women's resilience",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${lora.variable}`}>
      <body className="min-h-screen bg-magnolia-white font-lora">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <MusicPlayerProvider>
            <Header />
            <main className="pt-16 pb-20">{children}</main>
            <Footer />
            <PersistentMusicPlayer />
            <Toaster />
          </MusicPlayerProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
