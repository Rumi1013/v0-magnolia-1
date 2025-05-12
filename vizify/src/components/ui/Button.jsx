import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-rich-gold text-midnight-blue hover:bg-rich-gold/90',
  secondary: 'bg-midnight-teal text-magnolia-white hover:bg-midnight-teal/90',
  outline: 'border border-midnight-blue text-midnight-blue hover:bg-midnight-blue hover:text-magnolia-white',
  ghost: 'text-midnight-blue hover:bg-midnight-blue/10',
  link: 'text-midnight-blue underline-offset-4 hover:underline',
  'outline-white': 'border border-magnolia-white text-magnolia-white hover:bg-magnolia-white/10',
};

const sizes = {
  sm: 'h-9 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-6 text-base',
  xl: 'h-12 px-8 text-base',
};

/**
 * Button component with various styles and animations
 * 
 * @param {string} variant - Button style variant (primary, secondary, outline, ghost, link, outline-white)
 * @param {string} size - Button size (sm, md, lg, xl)
 * @param {string} href - Optional URL for Link buttons
 * @param {boolean} animate - Whether to use motion animation
 * @param {function} onClick - Click handler
 * @param {boolean} disabled - Whether button is disabled
 * @param {ReactNode} children - Button content
 * @param {string} className - Additional CSS classes
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  href,
  animate = false,
  onClick,
  disabled = false,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = `inline-flex items-center justify-center rounded-md text-sm font-accent font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-midnight-teal focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`;
  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.md;
  
  const buttonClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;
  
  const buttonContent = (
    <>
      {children}
    </>
  );
  
  // If href is provided, render as a Link
  if (href) {
    if (animate) {
      return (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link href={href} className={buttonClasses} {...props}>
            {buttonContent}
          </Link>
        </motion.div>
      );
    }
    
    return (
      <Link href={href} className={buttonClasses} {...props}>
        {buttonContent}
      </Link>
    );
  }
  
  // Otherwise, render as a button
  if (animate) {
    return (
      <motion.button
        className={buttonClasses}
        onClick={onClick}
        disabled={disabled}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {buttonContent}
      </motion.button>
    );
  }
  
  return (
    <button 
      className={buttonClasses} 
      onClick={onClick} 
      disabled={disabled}
      {...props}
    >
      {buttonContent}
    </button>
  );
};

export default Button;