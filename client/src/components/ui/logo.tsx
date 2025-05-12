import React from 'react';
// Import the logo directly
import logoImage from '@assets/freepik__a-vintagemeetsmodern-logo-featuring-a-delicate-whi__90240.png';

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
      />
    </div>
  );
};

export default Logo;