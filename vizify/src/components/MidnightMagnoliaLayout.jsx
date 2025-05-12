import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/MidnightMagnolia.module.css';

const MidnightMagnoliaLayout = ({ children, title, description }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title ? `Midnight Magnolia | ${title}` : 'Midnight Magnolia'}</title>
        <meta name="description" content={description || 'Midnight Magnolia Event Planning'} />
        <link rel="icon" href="/favicon.ico" />
        {/* Add Google Fonts for the theme */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Lato:wght@300;400;700&display=swap" 
          rel="stylesheet"
        />
      </Head>

      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <Link href="/midnight-magnolia/overview">
              <span className={styles.logoText}>Midnight Magnolia</span>
            </Link>
          </div>
          
          <nav className={styles.navigation}>
            <ul>
              <li>
                <Link href="/midnight-magnolia/overview" className={styles.navLink}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/midnight-magnolia/services" className={styles.navLink}>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/midnight-magnolia/portfolio" className={styles.navLink}>
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/midnight-magnolia/about" className={styles.navLink}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/midnight-magnolia/faq" className={styles.navLink}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/midnight-magnolia/contact" className={styles.navLink}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className={styles.mobileMenuToggle}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <h3>Midnight Magnolia</h3>
            <p>Elegant Event Planning</p>
          </div>
          
          <div className={styles.footerLinks}>
            <div className={styles.footerLinkColumn}>
              <h4>Quick Links</h4>
              <ul>
                <li><Link href="/midnight-magnolia/overview">Home</Link></li>
                <li><Link href="/midnight-magnolia/services">Services</Link></li>
                <li><Link href="/midnight-magnolia/portfolio">Portfolio</Link></li>
                <li><Link href="/midnight-magnolia/about">About</Link></li>
              </ul>
            </div>
            
            <div className={styles.footerLinkColumn}>
              <h4>Resources</h4>
              <ul>
                <li><Link href="/midnight-magnolia/faq">FAQ</Link></li>
                <li><Link href="/midnight-magnolia/blog">Blog</Link></li>
                <li><Link href="/midnight-magnolia/testimonials">Testimonials</Link></li>
                <li><Link href="/midnight-magnolia/vendors">Preferred Vendors</Link></li>
              </ul>
            </div>
            
            <div className={styles.footerLinkColumn}>
              <h4>Legal</h4>
              <ul>
                <li><Link href="/midnight-magnolia/privacy">Privacy Policy</Link></li>
                <li><Link href="/midnight-magnolia/terms">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className={styles.footerContact}>
            <h4>Contact Us</h4>
            <p>
              <a href="mailto:info@midnightmagnolia.com">info@midnightmagnolia.com</a>
            </p>
            <p>
              <a href="tel:+15551234567">(555) 123-4567</a>
            </p>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="Instagram">
                <span className={styles.socialIcon}>Insta</span>
              </a>
              <a href="#" aria-label="Facebook">
                <span className={styles.socialIcon}>FB</span>
              </a>
              <a href="#" aria-label="Pinterest">
                <span className={styles.socialIcon}>Pin</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} Midnight Magnolia Event Planning. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MidnightMagnoliaLayout;