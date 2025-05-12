import '../styles/globals.css';

export const metadata = {
  title: 'Midnight Magnolia | A Southern Digital Sanctuary',
  description: 'Midnight Magnolia - A digital-first brand weaving together creativity, self-healing, automation, and storytelling for women of resilience.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lora:wght@400;500&family=Montserrat:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-magnolia-white min-h-screen">
        {children}
      </body>
    </html>
  );
}