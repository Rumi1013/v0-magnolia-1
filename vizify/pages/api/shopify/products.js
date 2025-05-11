import { getAllProducts, getProductByHandle } from '../../../lib/shopify/client';

export default async function handler(req, res) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      try {
        // If handle is provided, get a specific product
        if (query.handle) {
          const product = await getProductByHandle(query.handle);
          
          if (!product) {
            return res.status(404).json({ error: 'Product not found' });
          }
          
          return res.status(200).json({ product });
        }
        
        // Otherwise, get all products
        const products = await getAllProducts();
        return res.status(200).json({ products });
      } catch (error) {
        console.error('Error in products API:', error);
        return res.status(500).json({ error: 'Failed to fetch products' });
      }
      
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}