import React, { useState } from "react";

// Next.js version of the Example component
const Example = () => {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // Call our API endpoint that replaces the HubSpot serverless function
  const handleClick = async () => {
    if (!text) return;
    
    setLoading(true);
    try {
      const result = await fetch('/api/myFunc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      
      const data = await result.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error calling API:', error);
      setResponse('Error: Failed to call the API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="extension-container">
      <div className="text-container">
        <p>
          <strong>Your first UI extension is ready!</strong>
        </p>
        <p>
          Congratulations! You just deployed your first
          application with serverless functionality. This example demonstrates how you would send
          parameters from your React frontend to the serverless function and get a
          response back.
        </p>
      </div>
      
      <div className="input-container">
        <label htmlFor="text-input">Send</label>
        <input 
          id="text-input"
          type="text" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading}
        />
        <button 
          onClick={handleClick}
          disabled={loading || !text}
        >
          {loading ? 'Sending...' : 'Click me'}
        </button>
      </div>
      
      {response && (
        <div className="response-container">
          <p><strong>Response:</strong> {response}</p>
        </div>
      )}
      
      <hr />
      
      <div className="links-container">
        <p>
          What now? Explore all available{" "}
          <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">
            Next.js documentation
          </a>
          , get started with{" "}
          <a href="https://vercel.com/docs" target="_blank" rel="noopener noreferrer">
            Vercel deployment
          </a>
          , or check out{" "}
          <a href="https://github.com/vercel/next.js/tree/canary/examples" target="_blank" rel="noopener noreferrer">
            example projects
          </a>
          .
        </p>
      </div>
      
      <style jsx>{`
        .extension-container {
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          margin: 0;
          padding: 20px;
        }
        
        .text-container {
          margin-bottom: 20px;
        }
        
        .input-container {
          display: flex;
          align-items: flex-end;
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .input-container label {
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 5px;
          display: block;
        }
        
        .input-container input {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }
        
        .input-container button {
          padding: 8px 16px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        
        .input-container button:hover {
          background-color: #0060df;
        }
        
        .input-container button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        
        .response-container {
          margin-top: 20px;
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 4px;
        }
        
        hr {
          border: 0;
          height: 1px;
          background-color: #eaeaea;
          margin: 20px 0;
        }
        
        .links-container a {
          color: #0070f3;
          text-decoration: none;
        }
        
        .links-container a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Example;