import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import PlayerContextProvider from "./context/PlayerContext";
import { AuthContextProvider } from "./context/AuthContext";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <AuthContextProvider>
          <PlayerContextProvider>
            <App />
          </PlayerContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
