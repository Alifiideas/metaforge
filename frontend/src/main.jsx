import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

// Global styles (reset + theme + utilities)
import "./styles/global.css";

/**
 * Root render
 * - StrictMode enabled for dev safety
 * - Single global CSS entry point
 */

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);

