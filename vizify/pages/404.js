import Link from 'next/link';

export default function Custom404() {
  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh', 
        textAlign: 'center',
        padding: '1rem',
        background: '#FAF3E0',
        color: '#0A192F',
        fontFamily: '"Lora", serif'
      }}
    >
      <h1 style={{ fontSize: '6rem', marginBottom: '1rem', fontFamily: '"Playfair Display", serif' }}>404</h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#D4AF37', fontFamily: '"Playfair Display", serif' }}>
        Page Not Found
      </h2>
      <p style={{ maxWidth: '30rem', marginBottom: '2rem' }}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        href="/" 
        style={{
          backgroundColor: '#D4AF37',
          color: '#0A192F',
          padding: '0.75rem 2rem',
          borderRadius: '0.375rem',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontFamily: '"Montserrat", sans-serif'
        }}
      >
        Return Home
      </Link>
    </div>
  );
}