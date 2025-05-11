import Client from 'shopify-buy';
import { SHOPIFY_STOREFRONT_ACCESS_TOKEN, SHOPIFY_STORE_DOMAIN } from './constants';

// Initialize Shopify Client (for storefront operations)
const client = Client.buildClient({
  domain: SHOPIFY_STORE_DOMAIN,
  storefrontAccessToken: SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});

export default client;

// Helper functions for common Shopify operations

/**
 * Fetch all products from Shopify
 * @returns {Promise<Array>} - Array of products
 */
export async function getAllProducts() {
  try {
    const products = await client.product.fetchAll();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

/**
 * Fetch a single product by handle (slug)
 * @param {string} handle - The product handle (slug)
 * @returns {Promise<Object>} - Product data
 */
export async function getProductByHandle(handle) {
  try {
    const product = await client.product.fetchByHandle(handle);
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error(`Error fetching product with handle ${handle}:`, error);
    return null;
  }
}

/**
 * Fetch all collections
 * @returns {Promise<Array>} - Array of collections
 */
export async function getAllCollections() {
  try {
    const collections = await client.collection.fetchAll();
    return JSON.parse(JSON.stringify(collections));
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
}

/**
 * Fetch a single collection by handle
 * @param {string} handle - The collection handle
 * @returns {Promise<Object>} - Collection data
 */
export async function getCollectionByHandle(handle) {
  try {
    const collection = await client.collection.fetchByHandle(handle);
    return JSON.parse(JSON.stringify(collection));
  } catch (error) {
    console.error(`Error fetching collection with handle ${handle}:`, error);
    return null;
  }
}

/**
 * Create a new checkout
 * @returns {Promise<Object>} - Checkout data
 */
export async function createCheckout() {
  try {
    const checkout = await client.checkout.create();
    return JSON.parse(JSON.stringify(checkout));
  } catch (error) {
    console.error('Error creating checkout:', error);
    return null;
  }
}

/**
 * Add items to a checkout
 * @param {string} checkoutId - The checkout ID
 * @param {Array} lineItems - The items to add
 * @returns {Promise<Object>} - Updated checkout
 */
export async function addItemsToCheckout(checkoutId, lineItems) {
  try {
    const checkout = await client.checkout.addLineItems(checkoutId, lineItems);
    return JSON.parse(JSON.stringify(checkout));
  } catch (error) {
    console.error('Error adding items to checkout:', error);
    return null;
  }
}

/**
 * Update items in a checkout
 * @param {string} checkoutId - The checkout ID
 * @param {Array} lineItems - The items to update
 * @returns {Promise<Object>} - Updated checkout
 */
export async function updateCheckoutItems(checkoutId, lineItems) {
  try {
    const checkout = await client.checkout.updateLineItems(checkoutId, lineItems);
    return JSON.parse(JSON.stringify(checkout));
  } catch (error) {
    console.error('Error updating checkout items:', error);
    return null;
  }
}

/**
 * Remove items from a checkout
 * @param {string} checkoutId - The checkout ID
 * @param {Array} lineItemIds - IDs of items to remove
 * @returns {Promise<Object>} - Updated checkout
 */
export async function removeItemsFromCheckout(checkoutId, lineItemIds) {
  try {
    const checkout = await client.checkout.removeLineItems(checkoutId, lineItemIds);
    return JSON.parse(JSON.stringify(checkout));
  } catch (error) {
    console.error('Error removing items from checkout:', error);
    return null;
  }
}