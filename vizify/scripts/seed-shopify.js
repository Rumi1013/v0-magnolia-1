/**
 * Shopify Product Seeder Script
 * 
 * This script seeds the Shopify store with product data from our models.
 * It uses the Shopify Admin API to create products, variants, and collections.
 * 
 * Usage:
 * 1. Set up environment variables in .env.local
 * 2. Run the script with: node scripts/seed-shopify.js
 */

require('dotenv').config({ path: '.env.local' });
const fetch = require('node-fetch');
const { 
  WEDDING_SERVICES, 
  CORPORATE_SERVICES, 
  SPECIAL_OCCASION_SERVICES, 
  CONSULTATION_SERVICES
} = require('../lib/shopify/models');

// Shopify Admin API configuration
const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_ADMIN_API_KEY = process.env.SHOPIFY_ADMIN_API_KEY;
const SHOPIFY_ADMIN_PASSWORD = process.env.SHOPIFY_ADMIN_SECRET;
const API_VERSION = '2023-10';

// Verify required environment variables
if (!SHOPIFY_DOMAIN || !SHOPIFY_ADMIN_API_KEY || !SHOPIFY_ADMIN_PASSWORD) {
  console.error('Missing required environment variables. Please check your .env.local file.');
  process.exit(1);
}

// API URL
const apiUrl = `https://${SHOPIFY_ADMIN_API_KEY}:${SHOPIFY_ADMIN_PASSWORD}@${SHOPIFY_DOMAIN}/admin/api/${API_VERSION}`;

// Collection IDs (to be set after creation)
const collections = {
  wedding: null,
  corporate: null,
  specialOccasion: null,
  consultation: null,
  featured: null
};

/**
 * Create a custom collection in Shopify
 * @param {string} title Collection title
 * @param {string} handle Collection handle
 * @param {string} description Collection description
 * @returns {Promise<object>} Created collection
 */
async function createCollection(title, handle, description) {
  try {
    const response = await fetch(`${apiUrl}/custom_collections.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        custom_collection: {
          title,
          handle,
          body_html: description,
          published: true
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to create collection: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Created collection: ${title}`);
    return data.custom_collection;
  } catch (error) {
    console.error(`Error creating collection ${title}:`, error);
    throw error;
  }
}

/**
 * Create a product in Shopify
 * @param {object} product Product data
 * @returns {Promise<object>} Created product
 */
async function createProduct(product) {
  try {
    // Prepare variants
    const variants = product.variants.map(variant => ({
      title: variant.title,
      price: variant.price.toString(),
      inventory_management: null, // No inventory tracking
      inventory_policy: 'continue', // Continue selling when out of stock
      requires_shipping: false // Service products don't need shipping
    }));

    // Prepare product data
    const productData = {
      title: product.title,
      body_html: product.description,
      vendor: 'Midnight Magnolia',
      product_type: product.productType,
      published: true,
      tags: product.tags.join(', '),
      variants,
      options: [
        {
          name: 'Service Option',
          values: product.variants.map(v => v.title)
        }
      ]
    };

    // Create the product
    const response = await fetch(`${apiUrl}/products.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product: productData })
    });

    if (!response.ok) {
      throw new Error(`Failed to create product: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Created product: ${product.title}`);
    return data.product;
  } catch (error) {
    console.error(`Error creating product ${product.title}:`, error);
    throw error;
  }
}

/**
 * Add a product to a collection
 * @param {string} productId Product ID
 * @param {string} collectionId Collection ID
 * @returns {Promise<void>}
 */
async function addProductToCollection(productId, collectionId) {
  try {
    const response = await fetch(`${apiUrl}/collects.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collect: {
          product_id: productId,
          collection_id: collectionId
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to add product to collection: ${response.statusText}`);
    }

    console.log(`Added product ${productId} to collection ${collectionId}`);
  } catch (error) {
    console.error(`Error adding product to collection:`, error);
    throw error;
  }
}

/**
 * Main function to seed all products and collections
 */
async function seedShopify() {
  try {
    // Create collections
    console.log('Creating collections...');
    
    collections.wedding = (await createCollection(
      'Wedding Planning',
      'wedding-planning',
      'Professional wedding planning services to make your special day perfect.'
    )).id;
    
    collections.corporate = (await createCollection(
      'Corporate Events',
      'corporate-events',
      'Professional planning for corporate events, conferences, and team building activities.'
    )).id;
    
    collections.specialOccasion = (await createCollection(
      'Special Occasions',
      'special-events',
      'Planning services for birthdays, anniversaries, and other special celebrations.'
    )).id;
    
    collections.consultation = (await createCollection(
      'Consultation Services',
      'consultations',
      'Professional guidance and advice for planning your own events.'
    )).id;
    
    collections.featured = (await createCollection(
      'Featured Services',
      'featured',
      'Our most popular event planning services.'
    )).id;

    // Create products and add to collections
    console.log('\nCreating wedding services...');
    for (const service of WEDDING_SERVICES) {
      const product = await createProduct(service);
      await addProductToCollection(product.id, collections.wedding);
      
      // Add featured services to the featured collection
      if (service.tags.includes('Featured')) {
        await addProductToCollection(product.id, collections.featured);
      }
    }

    console.log('\nCreating corporate event services...');
    for (const service of CORPORATE_SERVICES) {
      const product = await createProduct(service);
      await addProductToCollection(product.id, collections.corporate);
      
      // Add featured services to the featured collection
      if (service.tags.includes('Featured')) {
        await addProductToCollection(product.id, collections.featured);
      }
    }

    console.log('\nCreating special occasion services...');
    for (const service of SPECIAL_OCCASION_SERVICES) {
      const product = await createProduct(service);
      await addProductToCollection(product.id, collections.specialOccasion);
      
      // Add featured services to the featured collection
      if (service.tags.includes('Featured')) {
        await addProductToCollection(product.id, collections.featured);
      }
    }

    console.log('\nCreating consultation services...');
    for (const service of CONSULTATION_SERVICES) {
      const product = await createProduct(service);
      await addProductToCollection(product.id, collections.consultation);
      
      // Add featured services to the featured collection
      if (service.tags.includes('Featured')) {
        await addProductToCollection(product.id, collections.featured);
      }
    }

    console.log('\n✅ Shopify store seeded successfully!');
  } catch (error) {
    console.error('Error seeding Shopify store:', error);
    process.exit(1);
  }
}

// Run the seeder
seedShopify();