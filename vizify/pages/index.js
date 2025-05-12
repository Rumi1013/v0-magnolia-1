import Head from 'next/head'

export default function Home() {
  return (
    <div className="midnight-theme">
      <Head>
        <title>Midnight Magnolia | A Southern Digital Sanctuary</title>
        <meta name="description" content="Midnight Magnolia - A digital-first brand weaving together creativity, self-healing, automation, and storytelling for women of resilience." />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lora:wght@400;500&family=Montserrat:wght@400;600&display=swap" rel="stylesheet" />
      </Head>

      <main className="midnight-container">
        <h1 className="midnight-heading">Midnight Magnolia</h1>
        <h2 className="midnight-subheading">A Southern Digital Sanctuary</h2>
        <p>A digital-first brand weaving together creativity, self-healing, automation, and storytelling for women of resilience.</p>
        <button className="midnight-button">Coming Soon</button>
      </main>
    </div>
  )
}