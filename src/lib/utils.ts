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

export function slug(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function titleCase(s: string) {
  return s
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function generateGradient(start: string, end: string, steps: number) {
  const startRGB = hexToRgb(start);
  const endRGB = hexToRgb(end);
  const colors = [];

  for (let i = 0; i < steps; i++) {
    const r = Math.round(startRGB.r + (endRGB.r - startRGB.r) * (i / (steps - 1)));
    const g = Math.round(startRGB.g + (endRGB.g - startRGB.g) * (i / (steps - 1)));
    const b = Math.round(startRGB.b + (endRGB.b - startRGB.b) * (i / (steps - 1)));
    colors.push(rgbToHex(r, g, b));
  }
  return colors;
}


function hexToRgb(hex: string) {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex.split("").map(c => c + c).join("");
  }
  const num = parseInt(hex, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

export function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
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
    creativeCommonsConfirmed: drink?.['strCreativeCommonsConfirmed'] ?? 'No',
    image: {
      source: drink?.['strImageSource'] ?? null,
      attribution: drink?.['strImageAttribution'] ?? null
    }
  };
}

