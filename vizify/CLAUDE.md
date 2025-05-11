# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Vizify, a HubSpot developer project based on the HubSpot Getting Started Project Template. It contains:
- A private HubSpot app
- A CRM card built with React
- A serverless function that the CRM card interacts with

The project demonstrates a simple integration between a React-based UI extension and HubSpot's serverless backend.

## Development Commands

### Local Development

```bash
# Run the project locally for development and testing
hs project dev
```

### Building and Deploying

```bash
# Upload the project to HubSpot
hs project upload
```

## Project Structure

- `hsproject.json` - Project configuration file
- `src/app/` - Main application directory
  - `app.json` - App configuration (scopes, extensions, webhooks)
  - `app.functions/` - Serverless functions for backend logic
    - `example-function.js` - Simple serverless function that receives input and returns a response
    - `serverless.json` - Serverless function configuration
  - `extensions/` - Frontend UI components
    - `Example.jsx` - React component for the CRM card
    - `example-card.json` - CRM card configuration
  - `webhooks/` - Webhook configurations
    - `webhooks.json` - Defines webhook subscriptions and settings

## Key Concepts

### UI Extensions

The CRM card (`Example.jsx`) is built using HubSpot's UI Extensions framework. It provides a React-based interface that appears as a tab in the HubSpot CRM contact record. The UI interacts with serverless functions through the `runServerless` API.

### Serverless Functions

The example function in `app.functions/example-function.js` is a simple serverless function that receives parameters from the UI and returns a response. Functions are configured in `serverless.json`.

### Webhooks

The project includes webhook configurations that can trigger on CRM object events like contact creation or property changes.

## HubSpot CLI

This project is designed to be used with the HubSpot CLI. Make sure it's installed and configured:

```bash
# Install HubSpot CLI globally
npm install -g @hubspot/cli

# Authenticate with HubSpot
hs auth
```

## Requirements

- An active HubSpot account
- HubSpot CLI installed and configured
- Access to developer projects (under "CRM Development Tools")