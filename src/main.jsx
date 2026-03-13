// src/main.jsx
// Punto de entrada de la aplicación (Vite + React)
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Reset de estilos globales del navegador
const globalStyle = document.createElement("style");
globalStyle.textContent = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0D0D1A; }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; }
`;
document.head.appendChild(globalStyle);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
