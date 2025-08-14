import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Any, Drink, NormalizedDrink } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isBrowser() {
  return typeof window !== 'undefined';
}

export function toQueryParams({
  firstLetter,
  search
}: { firstLetter?: string, search?: string }) {
  const params = new URLSearchParams();

  if (firstLetter) {
    params.append('f', firstLetter)
  }

  if (search) {
    params.append('s', search)
  }

  return params.toString();
}

export function debounce<T extends (...args: Any[]) => Any>(
  fn: T,
  delay = 300
) {
  let timer: ReturnType<typeof setTimeout> | null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  } as (...args: Parameters<T>) => void;
}

export function normalizeDrink(drink: Drink): NormalizedDrink {
  const get = (k: string) => (drink?.[k as keyof typeof drink] ?? null) as string | null;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : null);

  const id = String(drink?.["idDrink"] ?? "");
  const category = str(get("strCategory"));
  const dateModified = str((drink?.["dateModified"]) as unknown);
  const drinkThumb = str(get("strDrinkThumb"));
  const glass = str(get("strGlass"));

  const alcoholicRaw = (get("strAlcoholic") || "")?.toLowerCase() || "";
  const isAlcoholic =
    alcoholicRaw.includes("alcoholic") && !alcoholicRaw.includes("non")
      ? true
      : alcoholicRaw.includes("non")
        ? false
        : alcoholicRaw.includes("optional")
          ? null
          : null;

  const instruction = (() => {
    const keys = Object.keys(drink).filter((k) => k.toLowerCase().startsWith("strinstructions"));

    keys.sort((a, b) => (a === "strInstructions" ? -1 : b === "strInstructions" ? 1 : 0));
    for (const k of keys) {
      const val = str(get(k));
      if (val) return val;
    }
    return null;
  })();

  const ingredients: Array<{ ingredient: string; measure: string | null }> = [];
  for (let i = 1; i <= 15; i++) {
    const ing = str(get(`strIngredient${i}`));
    const meas = str(get(`strMeasure${i}`));

    if (!ing && !meas) continue;
    if (ing) {
      ingredients.push({ ingredient: ing, measure: meas || null });
    } else if (meas) {
      ingredients.push({ ingredient: "", measure: meas });
    }
  }

  return {
    id,
    name: drink.strDrink,
    category,
    dateModified,
    drinkThumb,
    isAlcoholic,
    glass,
    instruction,
    ingredients,
  };
}

