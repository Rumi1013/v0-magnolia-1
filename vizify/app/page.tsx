export default function Home() {
  return (
    <main className="midnight-theme" style={{
      backgroundImage: 'linear-gradient(to bottom, rgba(10, 25, 47, 0.05), rgba(10, 25, 47, 0.01))',
      minHeight: '100vh'
    }}>
      <div className="midnight-container">
        <div className="animate-float mb-8">
          <h1 className="midnight-heading font-heading text-4xl md:text-5xl lg:text-6xl font-bold">
            Midnight <span className="text-[#d4af37]">Magnolia</span>
          </h1>
          <p className="midnight-subheading font-accent tracking-wide">
            A Southern Digital Sanctuary
          </p>
        </div>

        <div className="p-8 rounded-lg bg-white/10 backdrop-blur-sm border border-[#d4af37]/20 shadow-lg max-w-2xl mx-auto">
          <p className="text-lg mb-6 font-body leading-relaxed">
            Welcome to our digital sanctuary where creativity, self-healing, and storytelling
            come together for women of resilience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="midnight-button midnight-button-primary midnight-button-lg shadow-md">
              Get Started
            </button>
            <button className="midnight-button midnight-button-outline midnight-button-lg shadow-md">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}