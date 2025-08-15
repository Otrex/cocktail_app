import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import "./mocks";

import App from "../src/App";
import { useGetCocktailsQuery } from "../src/services/cocktail";

import * as React from "react";
import { Any } from "@/lib/types";

vi.mock("../src/services/cocktail", () => {
  return {
    useGetCocktailsQuery: vi.fn(),
  };
});

vi.mock("../src/contexts/FavoritesContext", () => {
  return {
    useFavorites: vi.fn(() => ({
      isFavorite: vi.fn(() => false),
      toggleFavorite: vi.fn(),
      favorites: [],
    })),
  };
});

vi.mock("../src/hooks/useUrlState", () => {
  return {
    default: vi.fn((key: string, initial: string) => {
      let value = initial;
      const setValue = vi.fn((next: string) => {
        value = next;
      });
      return [value, setValue] as const;
    }),
  };
});

describe("App Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("shows skeleton while loading", () => {
    vi.mocked(useGetCocktailsQuery).mockReturnValue({
      isFetching: true,
      isError: false,
      data: undefined,
    } as Any);

    render(<App />);
    expect(screen.getByTestId("cocktails-skeleton")).toBeInTheDocument();
  });

  test("shows error block", () => {
    vi.mocked(useGetCocktailsQuery).mockReturnValue({
      isFetching: false,
      isError: true,
      data: undefined,
    } as Any);

    render(<App />);
    expect(screen.getByTestId("cocktails-error")).toBeInTheDocument();
  });

  test("shows empty block", () => {
    vi.mocked(useGetCocktailsQuery).mockReturnValue({
      data: [],
      isFetching: false,
      isError: false,
    } as Any);

    render(<App />);
    expect(screen.getByTestId("cocktails-empty")).toBeInTheDocument();
  });

  test("renders cards on success", () => {
    vi.mocked(useGetCocktailsQuery).mockReturnValue({
      data: [
        { id: "1", name: "Negroni" },
        { id: "2", name: "Daiquiri" },
      ],
      isFetching: false,
      isError: false,
    } as Any);

    render(<App />);
    expect(screen.getAllByTestId("cocktail-card")).toHaveLength(2);
  });
});
