import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { HelmetProvider } from "react-helmet-async"; // ✅ Import HelmetProvider

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="333825329155-4io2s46ts8eebr69sf9hhb9krvqhmspv.apps.googleusercontent.com">
      <HelmetProvider> {/* ✅ Wrap your app */}
        <App />
      </HelmetProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
