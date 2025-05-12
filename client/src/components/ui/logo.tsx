import React from 'react';
// Import the logo directly
import logoImage from '../../assets/logo.png';

export const Logo: React.FC<{
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ className, size = 'md' }) => {
  // Define sizes for different variants
  const sizes = {
    sm: { height: '32px', width: 'auto' },
    md: { height: '40px', width: 'auto' },
    lg: { height: '60px', width: 'auto' },
  };

  return (
    <div className={`relative ${className}`}>
      <img 
        src={logoImage} 
        alt="Midnight Magnolia Logo" 
        style={sizes[size]}
        className="object-contain"
        onError={(e) => {
          // If image fails to load, show a fallback
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          // Add a fallback element with brand color
          const parent = target.parentElement;
          if (parent && !parent.querySelector('.logo-fallback')) {
            const fallback = document.createElement('div');
            fallback.className = 'logo-fallback flex items-center justify-center rounded-full bg-[#D4AF37] text-[#0A192F] font-bold';
            fallback.style.width = sizes[size].height;
            fallback.style.height = sizes[size].height;
            fallback.textContent = 'MM';
            parent.appendChild(fallback);
          }
        }}
      />
    </div>
  );
};

export default Logo;