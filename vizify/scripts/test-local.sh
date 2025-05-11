#!/bin/bash

# Test script for Vizify local development setup

# Create the directory for the script
mkdir -p $(dirname "$0")

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js to continue."
    exit 1
else
    NODE_VERSION=$(node -v)
    echo "✅ Node.js is installed (version: $NODE_VERSION)"
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm to continue."
    exit 1
else
    NPM_VERSION=$(npm -v)
    echo "✅ npm is installed (version: $NPM_VERSION)"
fi

# Navigate to the project directory
cd "$(dirname "$0")/.." || exit

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Make sure you're in the correct directory."
    exit 1
else
    echo "✅ package.json found"
fi

# Install dependencies (if not already installed)
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    else
        echo "✅ Dependencies installed successfully"
    fi
else
    echo "✅ Dependencies already installed"
fi

# Check if required files exist
required_files=(
    "next.config.js"
    "vercel.json"
    "pages/index.js"
    "pages/_app.js"
    "pages/api/myFunc.js"
    "components/Example.jsx"
    "styles/globals.css"
    "styles/Home.module.css"
)

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Required file not found: $file"
        missing_files=true
    fi
done

if [ "$missing_files" = true ]; then
    echo "❌ Some required files are missing. Please check the project structure."
    exit 1
else
    echo "✅ All required files are present"
fi

# Start development server in background for testing
echo "🚀 Starting Next.js development server for testing..."
npm run dev &
DEV_PID=$!

# Allow server to start
sleep 5

# Test API endpoint
echo "🔍 Testing API endpoint..."
API_TEST=$(curl -s -X POST -H "Content-Type: application/json" -d '{"text":"test"}' http://localhost:3000/api/myFunc)
if [[ "$API_TEST" == *"response"* ]]; then
    echo "✅ API endpoint is working properly"
else
    echo "❌ API endpoint test failed"
    kill $DEV_PID
    exit 1
fi

# Kill the development server
kill $DEV_PID

echo "🎉 Local development setup test completed successfully!"
echo "✨ You can now run 'npm run dev' to start the development server"