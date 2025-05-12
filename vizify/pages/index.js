import Head from 'next/head';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Midnight Magnolia | A Southern Digital Sanctuary</title>
        <meta name="description" content="Midnight Magnolia - A digital-first brand weaving together creativity, self-healing, automation, and storytelling for women of resilience." />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lora:wght@400;500&family=Montserrat:wght@400;600&display=swap" rel="stylesheet" />
      </Head>

      <main>
        <h1 className="title">
          Midnight Magnolia<br/>
          <span>A Southern Digital Sanctuary</span>
        </h1>

        <p className="description">
          A digital-first brand weaving together creativity, self-healing, automation,
          and storytelling for women of resilience. Anchored in Southern Gothic elegance,
          it's a sanctuary for transformation through art, tech, and income stability.
        </p>

        <div className="grid">
          <a href="/shop" className="card">
            <h3>Shop &rarr;</h3>
            <p>Explore our digital products for creativity, healing, and resilience.</p>
          </a>

          <a href="/about" className="card">
            <h3>About Us &rarr;</h3>
            <p>Learn about our mission and the story behind Midnight Magnolia.</p>
          </a>
        </div>
      </main>

      <footer>
        <p>Powered by Midnight Magnolia</p>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #FAF3E0;
          color: #0A192F;
          font-family: 'Lora', serif;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          max-width: 800px;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: #D4AF37;
          text-decoration: none;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          text-align: center;
          font-family: 'Playfair Display', serif;
        }

        .title span {
          color: #D4AF37;
          font-weight: normal;
          font-size: 2.5rem;
        }

        .description {
          text-align: center;
          line-height: 1.5;
          font-size: 1.5rem;
          margin: 2rem 0;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
          background-color: white;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #D4AF37;
          border-color: #D4AF37;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
          font-family: 'Playfair Display', serif;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: 'Lora', serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}