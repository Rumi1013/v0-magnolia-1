// Add TypeScript declarations for image imports
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';

// Declare any styles modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Helpful for working with the Shopify API
interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description?: string;
  descriptionHtml?: string;
  images: Array<{
    src: string;
    altText?: string;
  }>;
  variants: Array<{
    id: string;
    title: string;
    price: string;
    available: boolean;
  }>;
  tags?: string[];
  createdAt?: string;
}

interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  products: Array<{
    id: string;
  }>;
}