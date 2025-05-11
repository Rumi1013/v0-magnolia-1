import { getAllCollections, getCollectionByHandle } from '../../../lib/shopify/client';

export default async function handler(req, res) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      try {
        // If handle is provided, get a specific collection
        if (query.handle) {
          const collection = await getCollectionByHandle(query.handle);
          
          if (!collection) {
            return res.status(404).json({ error: 'Collection not found' });
          }
          
          return res.status(200).json({ collection });
        }
        
        // Otherwise, get all collections
        const collections = await getAllCollections();
        return res.status(200).json({ collections });
      } catch (error) {
        console.error('Error in collections API:', error);
        return res.status(500).json({ error: 'Failed to fetch collections' });
      }
      
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}