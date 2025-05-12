# Vizify - HubSpot Project with Vercel Deployment

This project is based on the HubSpot Getting Started template. It contains a private app, a CRM card written in React, and a serverless function that the CRM card interacts with. This version has been adapted to support deployment on Vercel.

## Project Overview

The project demonstrates a simple integration between a React-based UI and serverless backend functionality, available in both HubSpot and Vercel environments.

## HubSpot Requirements

To use this project with HubSpot:

- An active HubSpot account
- [HubSpot CLI](https://www.npmjs.com/package/@hubspot/cli) installed and set up
- Access to developer projects (under "CRM Development Tools")

## Vercel Deployment

This project has been configured for deployment on Vercel's platform, which provides:

- Automatic deployments from Git
- Serverless functions for backend logic
- Global CDN for frontend assets
- Preview deployments for testing

For detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md).

## Local Development

### HubSpot Development

Run this HubSpot CLI command in your project directory and follow the prompts:

```bash
hs project dev
```

### Next.js Development (Vercel)

For Vercel-compatible development:

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app/` - HubSpot app configuration and components
- `pages/` - Next.js pages for Vercel deployment
- `components/` - React components
- `pages/api/` - Serverless API endpoints for Vercel
- `styles/` - CSS styles for Next.js frontend

## Testing

Run the test script to ensure your local setup is working correctly:

```bash
./scripts/test-local.sh
```
