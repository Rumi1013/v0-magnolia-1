import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useShopify } from '../../lib/shopify/context';
import styles from '../../styles/shopify/ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { addItemToCheckout, toggleCart } = useShopify();
  
  if (!product) return null;
  
  // Find the first available variant (or use the first one if none are available)
  const variant = product.variants && product.variants.length > 0
    ? product.variants.find(v => v.available) || product.variants[0]
    : null;
    
  const price = variant ? variant.price : null;
  
  // Get the featured image or placeholder
  const featuredImage = product.images && product.images.length > 0
    ? product.images[0]
    : { src: '/images/midnight-magnolia/placeholder.jpg', altText: 'Product image placeholder' };
    
  const handleAddToCart = () => {
    if (variant && variant.id) {
      addItemToCheckout(variant.id, 1);
      toggleCart(); // Open the cart sidebar after adding an item
    }
  };
  
  return (
    <div className={styles.productCard}>
      <Link href={`/shop/products/${product.handle}`} className={styles.imageLink}>
        <div className={styles.imageContainer}>
          <Image
            src={featuredImage.src}
            alt={featuredImage.altText || product.title}
            width={400}
            height={400}
            layout="responsive"
            objectFit="cover"
          />
          {!variant?.available && (
            <div className={styles.soldOutBadge}>Sold Out</div>
          )}
        </div>
      </Link>
      
      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>
          <Link href={`/shop/products/${product.handle}`}>
            {product.title}
          </Link>
        </h3>
        
        <p className={styles.productPrice}>
          {price ? `$${parseFloat(price).toFixed(2)}` : 'Price unavailable'}
        </p>
        
        <div className={styles.productType}>
          {product.productType}
        </div>
        
        <button
          className={styles.addToCartButton}
          onClick={handleAddToCart}
          disabled={!variant?.available}
        >
          {variant?.available ? 'Add to Cart' : 'Sold Out'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;