import useLocalStorage from "@/hooks/useLocalStorage";
import type { NormalizedDrink } from "@/lib/types";
import React, { createContext, useContext } from "react";

interface FavoritesContextType {
  favorites: NormalizedDrink[];
  addToFavorites: (item: NormalizedDrink) => void;
  removeFromFavorites: (itemId: string) => void;
  toggleFavorite: (item: NormalizedDrink) => void;
  isFavorite: (itemId: string) => boolean;
  clearFavorites: () => void;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useLocalStorage<NormalizedDrink[]>(
    "app-favourites",
    []
  );

  const addToFavorites = (item: NormalizedDrink) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFromFavorites = (itemId: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== itemId));
  };

  const isFavorite = (itemId: string | number): boolean => {
    return favorites.some((fav) => fav.id === itemId);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const value: FavoritesContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearFavorites,
    toggleFavorite: (item: NormalizedDrink) => {
      if (isFavorite(item.id)) {
        removeFromFavorites(item.id);
      } else {
        addToFavorites(item);
      }
    },
    favoritesCount: favorites.length,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }

  return context;
}
