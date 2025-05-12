import React from 'react';
import Link from 'next/link';

/**
 * Button component with various styles
 * 
 * @param {string} variant - Button style variant (primary, secondary, outline, ghost, link)
 * @param {string} size - Button size (sm, md, lg, xl)
 * @param {string} href - Optional URL for Link buttons
 * @param {function} onClick - Click handler
 * @param {boolean} disabled - Whether button is disabled
 * @param {ReactNode} children - Button content
 * @param {string} className - Additional CSS classes
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  children,
  className = '',
  ...props
}) => {
  // Build class names based on props
  const baseClasses = 'midnight-button';
  const variantClass = variant ? `midnight-button-${variant}` : '';
  const sizeClass = size ? `midnight-button-${size}` : '';
  const buttonClasses = `${baseClasses} ${variantClass} ${sizeClass} ${className}`.trim();
  
  // If href is provided, render as a Link
  if (href) {
    return (
      <Link href={href} className={buttonClasses} {...props}>
        {children}
      </Link>
    );
  }
  
  // Otherwise, render as a button
  return (
    <button 
      className={buttonClasses} 
      onClick={onClick} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;