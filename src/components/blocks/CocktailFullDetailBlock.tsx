import type { NormalizedDrink } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ImageZoom } from "../ui/shadcn-io/image-zoom";
import AppImage from "../helpers/Image";
import { For, If, IfElse } from "./LogicBlocks";

type Props = {
  drink: NormalizedDrink;
};

export function CocktailFullDetailBlock({ drink }: Props) {
  const {
    id,
    name,
    category,
    dateModified,
    drinkThumb,
    isAlcoholic,
    glass,
    instruction,
    ingredients,
  } = drink;

  return (
    <div className="w-full max-w-4xl text-left  mx-auto p-4">
      <div className="rounded border relative bg-white max-h-[calc(100vh-5rem)] pb-8 overflow-auto">
        <div className="flex flex-col  sm:flex-row  sticky top-0 z-[10] justify-between gap-4 p-5 border-b bg-gradient-to-r from-zinc-50 to-white">
          <div>
            <h1 className="sm:text-2xl text-xl font-semibold tracking-tight">
              {name ?? "Drink"}
            </h1>
            <p className="text-sm text-zinc-600">ID: {id}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <If condition={isAlcoholic !== null}>
              <span
                className={cn(
                  "px-2.5 py-1 text-xs font-medium rounded-full border",
                  isAlcoholic
                    ? "bg-rose-50 text-rose-700 border-rose-200"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                )}
              >
                {isAlcoholic ? "Alcoholic" : "Non-alcoholic"}
              </span>
            </If>
            <If condition={!!category}>
              <span className="px-2.5 py-1 text-xs font-medium rounded-full border bg-zinc-50 text-zinc-700">
                {category}
              </span>
            </If>
            <If condition={!!glass}>
              <span className="px-2.5 py-1 text-xs font-medium rounded-full border bg-zinc-50 text-zinc-700">
                {glass}
              </span>
            </If>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 max-h-[calc(100vh-3rem)] gap-6 p-5">
          <div className="md:col-span-1">
            <ImageZoom>
              <div className="aspect-[4/5] w-full flex items-center overflow-hidden rounded border bg-zinc-50">
                <IfElse
                  condition={!!drinkThumb}
                  fallback={
                    <div className="h-full w-full grid place-items-center text-zinc-400 text-sm">
                      No image
                    </div>
                  }
                >
                  <AppImage
                    src={drinkThumb!}
                    alt={name ?? "Drink image"}
                    className="h-full w-full object-cover"
                  />
                </IfElse>
              </div>
            </ImageZoom>
          </div>

          <div className="md:col-span-2  flex flex-col gap-6">
            <section>
              <h2 className="text-lg font-semibold mb-2">Instructions</h2>
              <IfElse
                condition={!!instruction}
                fallback={
                  <p className="text-zinc-500">No instructions available.</p>
                }
              >
                <p className="leading-relaxed text-zinc-800 whitespace-pre-line">
                  {instruction}
                </p>
              </IfElse>
            </section>

            <section>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">Ingredients</h2>
              </div>
              <div className="overflow-hidden rounded border">
                <table className="w-full text-sm">
                  <thead className="bg-zinc-50 text-zinc-700">
                    <tr>
                      <th className="text-left font-medium px-4 py-2">
                        Ingredient
                      </th>
                      <th className="text-left font-medium px-4 py-2">
                        Measure
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <IfElse
                      condition={!!ingredients.length}
                      fallback={
                        <tr>
                          <td className="px-4 py-3 text-zinc-500" colSpan={2}>
                            No ingredients listed.
                          </td>
                        </tr>
                      }
                    >
                      <For
                        each={ingredients}
                        render={(row, idx) => (
                          <tr
                            key={idx}
                            className={+idx % 2 ? "bg-white" : "bg-zinc-50/50"}
                          >
                            <td className="px-4 py-2 align-top">
                              {row.ingredient || (
                                <span className="text-zinc-400">—</span>
                              )}
                            </td>
                            <td className="px-4 py-2 align-top">
                              {row.measure ?? (
                                <span className="text-zinc-400">—</span>
                              )}
                            </td>
                          </tr>
                        )}
                      />
                    </IfElse>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-6 text-zinc-600">
              <div className="rounded border p-3">
                <div className="text-xs uppercase tracking-wide text-zinc-500">
                  Date modified
                </div>
                <div className="mt-1">{dateModified || "—"}</div>
              </div>
              <div className="rounded border p-3">
                <div className="text-xs uppercase tracking-wide text-zinc-500">
                  Glass
                </div>
                <div className="mt-1">{glass || "—"}</div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
