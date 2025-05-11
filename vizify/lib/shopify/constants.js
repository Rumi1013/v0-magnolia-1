// Shopify configuration constants

// Store information
export const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'midnight-magnolia.myshopify.com';
export const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// API version
export const SHOPIFY_API_VERSION = '2023-10';

// Collection handles
export const COLLECTION_HANDLES = {
  FEATURED: 'featured',
  WEDDING: 'wedding-planning',
  CORPORATE: 'corporate-events',
  SPECIAL_EVENTS: 'special-events',
};

// Product type constants
export const PRODUCT_TYPES = {
  SERVICE: 'service',
  PACKAGE: 'package',
  CONSULTATION: 'consultation',
  ADDON: 'addon',
};

// Authentication constants
export const SHOPIFY_ADMIN_API_KEY = process.env.SHOPIFY_ADMIN_API_KEY;
export const SHOPIFY_ADMIN_SECRET = process.env.SHOPIFY_ADMIN_SECRET;

// Environment check
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';