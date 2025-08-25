import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import * as React from "react";

vi.mock("../src/services/cocktail", () => ({
  useGetCocktailsQuery: vi.fn(),
}));

vi.mock("../src/contexts/FavoritesContext", () => ({
  useFavorites: vi.fn(),
}));

vi.mock("./hooks/useUrlState", () => ({
  default: vi.fn((key: string, initial: string) => [initial, vi.fn()]),
}));

vi.mock("../src/hooks/useDebouncedState", () => ({
  default: vi.fn(),
}));

import App from "../src/App";
import { useGetCocktailsQuery } from "../src/services/cocktail";
import { useFavorites } from "../src/contexts/FavoritesContext";
import useDebouncedState from "../src/hooks/useDebouncedState";
import { Any } from "@/lib/types";

const mockUseGetCocktailsQuery = vi.mocked(useGetCocktailsQuery);
const mockUseFavorites = vi.mocked(useFavorites);
const mockUseDebouncedState = vi.mocked(useDebouncedState);

describe("App debounce", () => {
  it(
    "debounces search but not firstLetter",
    async () => {
      // Set up mocks
      mockUseGetCocktailsQuery.mockReturnValue({
        data: [],
        isFetching: false,
        isError: false,
      } as Any);

      mockUseFavorites.mockReturnValue({
        isFavorite: vi.fn(() => false),
        toggleFavorite: vi.fn(),
        favorites: [],
      } as Any);

      mockUseDebouncedState.mockReturnValue("");

      vi.useFakeTimers();

      render(<App />);

      expect(mockUseGetCocktailsQuery).toHaveBeenCalled();
      mockUseGetCocktailsQuery.mockClear();

      const searchInput = screen.getByRole("textbox", { name: /search/i });
      fireEvent.change(searchInput, { target: { value: "mojito" } });

      vi.advanceTimersByTime(400);
      vi.advanceTimersByTime(100);

      mockUseDebouncedState.mockReturnValue("mojito");
      render(<App />);

      expect(mockUseGetCocktailsQuery).toHaveBeenCalledWith(
        expect.stringContaining("f=A&s=mojito")
      );

      mockUseGetCocktailsQuery.mockClear();

      fireEvent.click(screen.getAllByRole("button", { name: "M" })[0]);

      expect(mockUseGetCocktailsQuery).toHaveBeenCalledTimes(1);
      expect(mockUseGetCocktailsQuery.mock.calls[0][0]).toEqual(
        expect.stringContaining("f=M&s=mojito")
      );

      vi.useRealTimers();
    },
    { timeout: 10000 }
  );
});
