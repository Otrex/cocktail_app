import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { FavoritesProvider } from "./contexts/FavoritesContext.tsx";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { cocktailApi } from "./services/cocktail.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApiProvider api={cocktailApi}>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </ApiProvider>
  </StrictMode>
);
