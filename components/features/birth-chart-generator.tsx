"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react"

export function BirthChartGenerator() {
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    birthTime: "",
    birthPlace: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // Would normally redirect to results or show chart
    }, 2000)
  }

  return (
    <div className="bg-midnight-blue/40 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-midnight-teal/30">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="font-heading text-2xl text-rich-gold mb-4">Celestial Insights Birth Chart</h3>
          <p className="text-magnolia-white/90 mb-6">
            Discover how the stars aligned at your birth and gain insights into your unique celestial blueprint. Our
            automated birth chart generator provides personalized astrological insights to support your healing journey.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-magnolia-white/90 mb-2 text-sm">
                Your Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-10 rounded-md bg-midnight-blue/60 border border-midnight-teal/50 text-magnolia-white focus:outline-none focus:ring-2 focus:ring-rich-gold"
                  required
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rich-gold/70 h-4 w-4"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </div>

            <div>
              <label htmlFor="birthDate" className="block text-magnolia-white/90 mb-2 text-sm">
                Birth Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-10 rounded-md bg-midnight-blue/60 border border-midnight-teal/50 text-magnolia-white focus:outline-none focus:ring-2 focus:ring-rich-gold"
                  required
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rich-gold/70 h-4 w-4" />
              </div>
            </div>

            <div>
              <label htmlFor="birthTime" className="block text-magnolia-white/90 mb-2 text-sm">
                Birth Time (as accurate as possible)
              </label>
              <div className="relative">
                <input
                  type="time"
                  id="birthTime"
                  name="birthTime"
                  value={formData.birthTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-10 rounded-md bg-midnight-blue/60 border border-midnight-teal/50 text-magnolia-white focus:outline-none focus:ring-2 focus:ring-rich-gold"
                  required
                />
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rich-gold/70 h-4 w-4" />
              </div>
            </div>

            <div>
              <label htmlFor="birthPlace" className="block text-magnolia-white/90 mb-2 text-sm">
                Birth Place (City, Country)
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="birthPlace"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-10 rounded-md bg-midnight-blue/60 border border-midnight-teal/50 text-magnolia-white focus:outline-none focus:ring-2 focus:ring-rich-gold"
                  required
                />
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rich-gold/70 h-4 w-4" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-rich-gold text-midnight-blue rounded-md font-accent text-sm hover:bg-rich-gold/90 transition-colors shadow-md hover:shadow-lg disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-midnight-blue"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating Chart...
                </>
              ) : (
                <>
                  Generate Birth Chart
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="relative h-80 md:h-full rounded-lg overflow-hidden shadow-xl">
          <Image src="/birth-chart-example.png" alt="Birth Chart Example" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h4 className="font-heading text-xl text-rich-gold mb-2">Celestial Insights</h4>
            <p className="text-magnolia-white/90 text-sm">
              Discover your sun, moon, rising signs and planetary placements to understand your unique cosmic blueprint.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
