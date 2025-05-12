"use client"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ServicesSection } from "@/components/sections/services-section"
import { ProductsSection } from "@/components/sections/products-section"
import { CTASection } from "@/components/sections/cta-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-magnolia-white">
      <SiteHeader />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProductsSection />
      <CTASection />
      <SiteFooter />
    </div>
  )
}
