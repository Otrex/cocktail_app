import { For, If } from "./LogicBlocks";
import type { NormalizedDrink } from "@/lib/types";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import CocktailCard from "../cards/CocktailCard";
import { Button } from "../ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";

const INITIAL_VISIBLE = 4;
export default function FavouritesBlock({
  drinks,
}: {
  drinks: NormalizedDrink[];
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const visibleItems = drinks.slice(0, INITIAL_VISIBLE);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="font-bold mb-3 text-xl">Favourites</h2>
        <div>Total Results: {drinks.length}</div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <For
          each={visibleItems}
          render={(item, index) => (
            <CocktailCard
              item={item}
              key={index}
              horizontal
              setFavourite={toggleFavorite}
              isFavourite={isFavorite(item.id)}
            />
          )}
        />
      </div>

      <If condition={drinks.length > INITIAL_VISIBLE}>
        <Dialog>
          <DialogTrigger asChild>
            <div className="mt-4 text-right">
              <Button className="hover:underline border px-4 py-2 rounded-lg">
                See all
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-auto ">
            <div className="max-h-[calc(100vh-4rem)] relative bg-white p-4 overflow-y-auto">
              <h2 className="font-bold mb-3 bg-white z-[100] text-xl sticky -top-4">
                Favourites
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <For
                  each={drinks}
                  render={(item, index) => (
                    <CocktailCard
                      item={item}
                      key={index}
                      horizontal
                      setFavourite={toggleFavorite}
                      isFavourite={isFavorite(item.id)}
                    />
                  )}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </If>
    </>
  );
}
