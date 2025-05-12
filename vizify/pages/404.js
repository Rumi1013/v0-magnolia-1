export default function Custom404() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Lora, serif',
      backgroundColor: '#FAF3E0',
      color: '#0A192F',
    }}>
      <h1 style={{ fontSize: '6rem', margin: '0', fontFamily: 'Playfair Display, serif' }}>404</h1>
      <h2 style={{ color: '#D4AF37', marginBottom: '2rem', fontFamily: 'Playfair Display, serif' }}>Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <a 
        href="/" 
        style={{
          marginTop: '2rem',
          backgroundColor: '#D4AF37',
          color: '#0A192F',
          padding: '0.75rem 2rem',
          borderRadius: '0.375rem',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontFamily: 'Montserrat, sans-serif',
        }}
      >
        Return Home
      </a>
    </div>
  )
}