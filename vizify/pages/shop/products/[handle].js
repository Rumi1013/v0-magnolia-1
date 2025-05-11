import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useShopify } from '../../../lib/shopify/context';
import ShoppingCart from '../../../components/shopify/ShoppingCart';
import { getAllProducts, getProductByHandle } from '../../../lib/shopify/client';
import styles from '../../../styles/shopify/ProductDetail.module.css';

// Get paths for all products for static generation
export async function getStaticPaths() {
  const products = await getAllProducts();
  
  const paths = products.map((product) => ({
    params: { handle: product.handle },
  }));
  
  return {
    paths,
    fallback: 'blocking', // Show a loading state for new products
  };
}

// Get data for a specific product
export async function getStaticProps({ params }) {
  const { handle } = params;
  
  try {
    const product = await getProductByHandle(handle);
    
    if (!product) {
      return {
        notFound: true,
      };
    }
    
    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error(`Error fetching product with handle ${handle}:`, error);
    return {
      notFound: true,
    };
  }
}

export default function ProductDetail({ product }) {
  const { addItemToCheckout, toggleCart } = useShopify();
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  if (!product) {
    return <div>Loading...</div>;
  }
  
  const handleVariantChange = (variantId) => {
    const variant = product.variants.find(v => v.id === variantId);
    setSelectedVariant(variant);
  };
  
  const handleQuantityChange = (newQuantity) => {
    // Ensure the quantity is a valid number between 1 and 10
    const quantity = Math.max(1, Math.min(10, newQuantity));
    setQuantity(quantity);
  };
  
  const handleAddToCart = () => {
    if (selectedVariant && selectedVariant.id) {
      addItemToCheckout(selectedVariant.id, quantity);
      toggleCart(); // Open the cart sidebar after adding an item
    }
  };
  
  // Format product price
  const price = selectedVariant ? parseFloat(selectedVariant.price).toFixed(2) : null;
  
  // Get product images
  const images = product.images && product.images.length > 0
    ? product.images
    : [{ src: '/images/midnight-magnolia/placeholder.jpg', altText: 'Product image placeholder' }];
  
  const selectedImage = images[selectedImageIndex];
  
  return (
    <div className={styles.container}>
      <Head>
        <title>{product.title} | Midnight Magnolia</title>
        <meta name="description" content={product.description || product.title} />
      </Head>
      
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/shop" className={styles.backLink}>
            &larr; Back to Shop
          </Link>
          <ShoppingCart />
        </div>
      </header>
      
      <main className={styles.main}>
        <div className={styles.productContainer}>
          <div className={styles.productImages}>
            <div className={styles.mainImageContainer}>
              <Image
                src={selectedImage.src}
                alt={selectedImage.altText || product.title}
                width={600}
                height={600}
                objectFit="cover"
                className={styles.mainImage}
              />
            </div>
            
            {images.length > 1 && (
              <div className={styles.thumbnailGrid}>
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={`${styles.thumbnailButton} ${index === selectedImageIndex ? styles.active : ''}`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={image.src}
                      alt={image.altText || `${product.title} thumbnail ${index + 1}`}
                      width={80}
                      height={80}
                      objectFit="cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className={styles.productDetails}>
            <h1 className={styles.productTitle}>{product.title}</h1>
            
            <div className={styles.productPrice}>
              ${price}
            </div>
            
            {product.description && (
              <div className={styles.productDescription}>
                <h2>Description</h2>
                <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
              </div>
            )}
            
            {product.variants && product.variants.length > 1 && (
              <div className={styles.variantSelector}>
                <label htmlFor="variant">Options:</label>
                <select
                  id="variant"
                  value={selectedVariant.id}
                  onChange={(e) => handleVariantChange(e.target.value)}
                  className={styles.variantSelect}
                >
                  {product.variants.map((variant) => (
                    <option
                      key={variant.id}
                      value={variant.id}
                      disabled={!variant.available}
                    >
                      {variant.title} {!variant.available ? '- Sold Out' : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <div className={styles.quantitySelector}>
              <label htmlFor="quantity">Quantity:</label>
              <div className={styles.quantityControls}>
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className={styles.quantityButton}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                  className={styles.quantityInput}
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                  className={styles.quantityButton}
                >
                  +
                </button>
              </div>
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant?.available}
              className={styles.addToCartButton}
            >
              {selectedVariant?.available ? 'Add to Cart' : 'Sold Out'}
            </button>
            
            {product.tags && product.tags.length > 0 && (
              <div className={styles.productTags}>
                <h2>Tags:</h2>
                <div className={styles.tagList}>
                  {product.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            )}
            
            <div className={styles.shippingInfo}>
              <h2>Shipping & Returns</h2>
              <p>
                For service bookings, please allow 24-48 hours for confirmation. 
                Our team will reach out to confirm details and schedule your event.
              </p>
              <p>
                For physical items, standard shipping is 3-5 business days.
                Free shipping on orders over $100.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}