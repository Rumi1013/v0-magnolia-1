import {
  createCheckout,
  addItemsToCheckout,
  updateCheckoutItems,
  removeItemsFromCheckout
} from '../../../lib/shopify/client';

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    // Create a new checkout
    case 'POST':
      try {
        const checkout = await createCheckout();
        
        if (!checkout) {
          return res.status(500).json({ error: 'Failed to create checkout' });
        }
        
        return res.status(201).json({ checkout });
      } catch (error) {
        console.error('Error creating checkout:', error);
        return res.status(500).json({ error: 'Failed to create checkout' });
      }
    
    // Add items to checkout
    case 'PUT':
      try {
        const { checkoutId, lineItems } = body;
        
        if (!checkoutId || !lineItems) {
          return res.status(400).json({ error: 'Checkout ID and line items are required' });
        }
        
        const checkout = await addItemsToCheckout(checkoutId, lineItems);
        
        if (!checkout) {
          return res.status(500).json({ error: 'Failed to add items to checkout' });
        }
        
        return res.status(200).json({ checkout });
      } catch (error) {
        console.error('Error adding items to checkout:', error);
        return res.status(500).json({ error: 'Failed to add items to checkout' });
      }
    
    // Update checkout items
    case 'PATCH':
      try {
        const { checkoutId, lineItems } = body;
        
        if (!checkoutId || !lineItems) {
          return res.status(400).json({ error: 'Checkout ID and line items are required' });
        }
        
        const checkout = await updateCheckoutItems(checkoutId, lineItems);
        
        if (!checkout) {
          return res.status(500).json({ error: 'Failed to update checkout items' });
        }
        
        return res.status(200).json({ checkout });
      } catch (error) {
        console.error('Error updating checkout items:', error);
        return res.status(500).json({ error: 'Failed to update checkout items' });
      }
    
    // Remove items from checkout
    case 'DELETE':
      try {
        const { checkoutId, lineItemIds } = body;
        
        if (!checkoutId || !lineItemIds) {
          return res.status(400).json({ error: 'Checkout ID and line item IDs are required' });
        }
        
        const checkout = await removeItemsFromCheckout(checkoutId, lineItemIds);
        
        if (!checkout) {
          return res.status(500).json({ error: 'Failed to remove items from checkout' });
        }
        
        return res.status(200).json({ checkout });
      } catch (error) {
        console.error('Error removing items from checkout:', error);
        return res.status(500).json({ error: 'Failed to remove items from checkout' });
      }
      
    default:
      res.setHeader('Allow', ['POST', 'PUT', 'PATCH', 'DELETE']);
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}