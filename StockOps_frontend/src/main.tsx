import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Impossible de trouver l'élément avec l'id 'root'");
}

createRoot(rootElement).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);
