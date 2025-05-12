import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

/**
 * Main layout component for Midnight Magnolia
 */
const MainLayout = ({ children, title = 'Midnight Magnolia | A Southern Digital Sanctuary' }) => {
  return (
    <div className="midnight-layout">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Midnight Magnolia - A digital-first brand weaving together creativity, self-healing, automation, and storytelling for women of resilience." />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lora:wght@400;500&family=Montserrat:wght@400;600&display=swap" rel="stylesheet" />
      </Head>

      <header className="midnight-header">
        <div className="midnight-header-inner">
          <Link href="/" className="midnight-logo">
            Midnight Magnolia
          </Link>
          <nav className="midnight-nav">
            <Link href="/" className="midnight-nav-item">
              Home
            </Link>
            <Link href="/about" className="midnight-nav-item">
              About
            </Link>
            <Link href="/services" className="midnight-nav-item">
              Services
            </Link>
            <Link href="/contact" className="midnight-nav-item">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="midnight-main">
        {children}
      </main>

      <footer className="midnight-footer">
        <div className="midnight-footer-inner">
          <div className="midnight-footer-logo">
            Midnight Magnolia
          </div>
          <div className="midnight-footer-copyright">
            &copy; {new Date().getFullYear()} Midnight Magnolia. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;