"use client";

export default function Home() {
  return (
    <main style={{
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: '#FAF3E0',
      color: '#0A192F'
    }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        Midnight Magnolia
      </h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem', color: '#0A3B4D' }}>
        A Southern Digital Sanctuary
      </p>
      <div>
        <a
          href="/pages"
          style={{
            backgroundColor: '#D4AF37',
            color: '#0A192F',
            padding: '0.75rem 2rem',
            borderRadius: '0.375rem',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          Visit Main Site
        </a>
      </div>
    </main>
  );
}