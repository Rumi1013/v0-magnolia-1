import type React from "react"
import "./globals.css"
import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Playfair_Display, Lora, Montserrat } from "next/font/google"

// Define fonts
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
  weight: ["400", "700"],
})

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
  weight: ["400", "500"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "500", "600"],
})

export const metadata = {
  title: "Midnight Magnolia",
  description: "Southern-rooted digital brand under Rumi-Nations LLC",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfairDisplay.variable} ${lora.variable} ${montserrat.variable} bg-[#0A192F] min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Navbar />
          <div className="pt-20">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
