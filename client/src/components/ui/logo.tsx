
import React from 'react';
import logoImage from '../../assets/logo.png';

export const Logo: React.FC<{
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'light' | 'vintage';
}> = ({ className, size = 'md', variant = 'default' }) => {
  // Define sizes for different variants
  const sizes = {
    sm: { height: '32px', width: 'auto' },
    md: { height: '48px', width: 'auto' },
    lg: { height: '72px', width: 'auto' },
  };

  // Define background styles for different variants
  const variantStyles = {
    default: 'bg-zinc-900',
    light: 'bg-white',
    vintage: 'bg-zinc-900/90',
  };

  return (
    <div className={`relative rounded-full ${variantStyles[variant]} ${className}`}>
      <img 
        src={logoImage} 
        alt="Midnight Magnolia Logo" 
        style={sizes[size]}
        className="object-contain drop-shadow-md"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          
          const parent = target.parentElement;
          if (parent && !parent.querySelector('.logo-fallback')) {
            const fallback = document.createElement('div');
            fallback.className = `logo-fallback flex items-center justify-center rounded-full 
              ${variant === 'light' ? 'bg-[#0A192F] text-[#D4AF37]' : 'bg-[#D4AF37] text-[#0A192F]'} 
              font-serif`;
            fallback.style.width = sizes[size].height;
            fallback.style.height = sizes[size].height;
            fallback.textContent = 'MM';
            parent.appendChild(fallback);
          }
        }}
      />
      
      {/* Optional decorative elements */}
      <div className="absolute inset-0 rounded-full ring-1 ring-[#D4AF37]/20"></div>
      <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#D4AF37]/10 to-[#A3B18A]/10 blur-sm"></div>
    </div>
  );
};

export default Logo;
