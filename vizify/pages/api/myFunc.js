export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract parameters from the request body
    const { text } = req.body;

    // Process the data similar to the HubSpot serverless function
    const response = `This is coming from a serverless function! You entered: ${text}`;

    // Return the response
    res.status(200).json({ response });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}