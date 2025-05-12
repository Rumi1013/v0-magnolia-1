"use client"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ServicesSection } from "@/components/sections/services-section"
import { ProductsSection } from "@/components/sections/products-section"
import { AutomationSection } from "@/components/sections/automation-section"
import { CelestialToolsSection } from "@/components/sections/celestial-tools-section"
import { CommunitySection } from "@/components/sections/community-section"
import { PatronPortalSection } from "@/components/sections/patron-portal-section"
import { CTASection } from "@/components/sections/cta-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-midnight-blue">
      <SiteHeader />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProductsSection />
      <AutomationSection />
      <CelestialToolsSection />
      <CommunitySection />
      <PatronPortalSection />
      <CTASection />
      <SiteFooter />
    </div>
  )
}
