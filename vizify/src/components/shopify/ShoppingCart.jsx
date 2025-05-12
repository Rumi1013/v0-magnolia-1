import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useShopify } from '../../lib/shopify/context';
import styles from '../../styles/shopify/ShoppingCart.module.css';

const ShoppingCart = () => {
  const { checkout, isCartOpen, toggleCart, updateCheckoutItem, removeCheckoutItem } = useShopify();
  const cartRef = useRef(null);
  
  // Close cart when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target) && isCartOpen) {
        toggleCart();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen, toggleCart]);
  
  // Prevent body scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCartOpen]);
  
  // Calculate total items in cart
  const totalItems = checkout?.lineItems?.reduce((total, item) => {
    return total + item.quantity;
  }, 0) || 0;
  
  // Update item quantity
  const handleQuantityChange = (lineItemId, quantity) => {
    updateCheckoutItem(lineItemId, quantity);
  };
  
  // Remove item from cart
  const handleRemoveItem = (lineItemId) => {
    removeCheckoutItem(lineItemId);
  };
  
  return (
    <>
      {/* Cart Button */}
      <button className={styles.cartButton} onClick={toggleCart}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        {totalItems > 0 && (
          <span className={styles.cartBadge}>{totalItems}</span>
        )}
      </button>
      
      {/* Cart Sidebar */}
      <div className={`${styles.cartSidebar} ${isCartOpen ? styles.open : ''}`}>
        <div className={styles.cartContent} ref={cartRef}>
          <div className={styles.cartHeader}>
            <h2>Your Cart</h2>
            <button className={styles.closeButton} onClick={toggleCart}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className={styles.cartItems}>
            {checkout?.lineItems?.length > 0 ? (
              checkout.lineItems.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.cartItemImage}>
                    {item.variant.image ? (
                      <Image
                        src={item.variant.image.src}
                        alt={item.title}
                        width={80}
                        height={80}
                        objectFit="cover"
                      />
                    ) : (
                      <div className={styles.imagePlaceholder} />
                    )}
                  </div>
                  
                  <div className={styles.cartItemDetails}>
                    <h3>{item.title}</h3>
                    {item.variant.title !== 'Default Title' && (
                      <p className={styles.cartItemVariant}>{item.variant.title}</p>
                    )}
                    <p className={styles.cartItemPrice}>
                      ${parseFloat(item.variant.price).toFixed(2)}
                    </p>
                    
                    <div className={styles.cartItemActions}>
                      <div className={styles.quantityControl}>
                        <button
                          onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      
                      <button
                        className={styles.removeButton}
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyCart}>
                <p>Your cart is empty</p>
                <button className={styles.shopButton} onClick={toggleCart}>
                  Shop Now
                </button>
              </div>
            )}
          </div>
          
          {checkout?.lineItems?.length > 0 && (
            <div className={styles.cartFooter}>
              <div className={styles.subtotal}>
                <span>Subtotal</span>
                <span>${parseFloat(checkout.subtotalPrice).toFixed(2)}</span>
              </div>
              <p className={styles.taxNote}>Taxes and shipping calculated at checkout</p>
              <a
                href={checkout.webUrl}
                className={styles.checkoutButton}
                target="_blank"
                rel="noopener noreferrer"
              >
                Proceed to Checkout
              </a>
              <button className={styles.continueShoppingButton} onClick={toggleCart}>
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Overlay */}
      {isCartOpen && <div className={styles.overlay} onClick={toggleCart} />}
    </>
  );
};

export default ShoppingCart;