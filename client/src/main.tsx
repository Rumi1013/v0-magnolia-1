import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add Font Awesome for icons
const fontAwesomeLink = document.createElement('link');
fontAwesomeLink.rel = 'stylesheet';
fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
document.head.appendChild(fontAwesomeLink);

// Add Google Fonts
const googleFontsLink = document.createElement('link');
googleFontsLink.rel = 'stylesheet';
googleFontsLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600;700&display=swap';
document.head.appendChild(googleFontsLink);

// Add font family classes
const style = document.createElement('style');
style.textContent = `
  .font-montserrat {
    font-family: 'Montserrat', sans-serif;
  }
  .font-playfair {
    font-family: 'Playfair Display', serif;
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
