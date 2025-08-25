// at the very top of the test file — before imports that use these modules
import { vi } from 'vitest'

vi.mock('./services/cocktail', () => {
  return {
    useGetCocktailsQuery: vi.fn()
  };
});

vi.mock('./contexts/FavoritesContext', () => {
  return {
    useFavorites: vi.fn(() => ({
      isFavorite: vi.fn(() => false),
      toggleFavorite: vi.fn(),
      favorites: []
    }))
  };
});

// emulate useUrlState as stateful but simple
vi.mock('./hooks/useUrlState', () => {
  return {
    default: vi.fn((key: string, initial: string) => {
      let value = initial;
      const setValue = vi.fn((next: string) => { value = next; });
      return [value, setValue] as const;
    })
  };
});
