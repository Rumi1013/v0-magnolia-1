import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Menu, X, Moon, Sun, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';

const MainLayout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  // Navigation links
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/midnight-magnolia/overview', label: 'About' },
    { href: '/blog', label: 'Journal' },
    { href: '/midnight-magnolia/contact', label: 'Contact' },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-4 border-b border-midnight-teal/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl font-heading font-bold text-rich-gold">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Midnight Magnolia
              </motion.span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className="text-sm uppercase tracking-wide font-accent hover:text-rich-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            
            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-midnight-blue/10 transition-colors"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <Link 
                href="/shop/cart" 
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-midnight-blue/10 transition-colors"
                aria-label="View shopping cart"
              >
                <ShoppingCart size={20} />
              </Link>
              
              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-midnight-blue/10 transition-colors"
                onClick={toggleMobileMenu}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <motion.div
        className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden fixed inset-0 z-50 bg-midnight-blue`}
        initial={{ opacity: 0, x: '100%' }}
        animate={{ 
          opacity: mobileMenuOpen ? 1 : 0,
          x: mobileMenuOpen ? 0 : '100%' 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <span className="text-2xl font-heading font-bold text-rich-gold">
              Midnight Magnolia
            </span>
            <button
              onClick={toggleMobileMenu}
              className="w-9 h-9 flex items-center justify-center rounded-full text-magnolia-white hover:bg-midnight-blue/30 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <nav className="flex flex-col space-y-6 text-magnolia-white">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="text-xl font-heading py-2 hover:text-rich-gold transition-colors"
                onClick={toggleMobileMenu}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="mt-auto">
            <div className="border-t border-midnight-teal pt-6 flex flex-col space-y-4 text-magnolia-white">
              <Link href="/account" className="flex items-center space-x-2 hover:text-rich-gold transition-colors">
                <span>My Account</span>
              </Link>
              <Link href="/shop/cart" className="flex items-center space-x-2 hover:text-rich-gold transition-colors">
                <ShoppingCart size={20} />
                <span>View Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <main className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
      
      {/* Footer */}
      <footer className="bg-midnight-blue text-magnolia-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-rich-gold text-xl font-heading mb-4">Midnight Magnolia</h3>
              <p className="text-sm text-magnolia-white/80 max-w-xs">
                A Southern Digital Sanctuary weaving together creativity, self-healing, automation,
                and storytelling for women of resilience.
              </p>
            </div>
            
            <div>
              <h4 className="text-magnolia-white text-lg font-heading mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-sm text-magnolia-white/80 hover:text-rich-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-magnolia-white text-lg font-heading mb-4">Contact</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="mailto:info@midnight-magnolia.com"
                    className="text-sm text-magnolia-white/80 hover:text-rich-gold transition-colors"
                  >
                    info@midnight-magnolia.com
                  </a>
                </li>
                <li className="text-sm text-magnolia-white/80">
                  Follow us on social media:
                </li>
                <li className="flex space-x-4 mt-2">
                  <a href="#" className="text-magnolia-white hover:text-rich-gold transition-colors">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-magnolia-white hover:text-rich-gold transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-midnight-teal text-center text-sm text-magnolia-white/60">
            <p>&copy; {new Date().getFullYear()} Midnight Magnolia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;