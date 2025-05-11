import React from 'react';
import Image from 'next/image';
import styles from '../styles/OptimizedImage.module.css';

/**
 * OptimizedImage Component
 * Uses Next.js Image optimization with proper fallbacks
 * 
 * @param {string} src - Image source path
 * @param {string} alt - Alt text for the image
 * @param {number} width - Width of the image
 * @param {number} height - Height of the image
 * @param {string} className - Optional CSS class
 * @param {object} layout - Layout mode (fixed, responsive, fill, intrinsic)
 * @param {object} objectFit - Object fit style (contain, cover, fill)
 * @param {boolean} priority - Whether to prioritize loading
 */
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  layout = 'responsive',
  objectFit = 'cover',
  priority = false,
  ...props
}) => {
  // Function to check if src is a remote URL
  const isRemoteUrl = (url) => {
    if (!url) return false;
    return url.startsWith('http://') || url.startsWith('https://');
  };

  // Placeholder image if source is missing
  const placeholderSrc = '/images/midnight-magnolia/placeholder.jpg';

  // Determine the actual src to use
  const imageSrc = src || placeholderSrc;

  return (
    <div className={`${styles.imageWrapper} ${className}`}>
      <Image
        src={imageSrc}
        alt={alt || 'Midnight Magnolia image'}
        width={width || 800}
        height={height || 600}
        layout={layout}
        objectFit={objectFit}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChgEQBPcjBgAAAABJRU5ErkJggg=="
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;