import type { DrinksResponse } from "@/lib/types";
import AppImage from "../helpers/Image";
import { IconButton } from "../ui/shadcn-io/icon-button";
import { Heart } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { normalizeDrink } from "@/lib/utils";
import { CocktailFullDetailBlock } from "../blocks/CocktailFullDetailBlock";

export interface IProps {
  item: DrinksResponse["drinks"][number];
  isFavourite?: boolean;
  setFavourite?: (item: DrinksResponse["drinks"][number]) => void;
}

export default function FavouriteCocktailCard({
  item,
  isFavourite = false,
  setFavourite,
}: IProps) {
  const drink = normalizeDrink(item);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-row justify-between ">
          <div>
            <div className="w-[8rem] h-full aspect-square relative overflow-hidden ">
              <AppImage
                src={item.strDrinkThumb}
                className="w-full h-full object-cover"
              />
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="absolute bottom-2 right-3 z-10"
              >
                <IconButton
                  icon={Heart}
                  color={[250, 0, 0]}
                  className="bg-black/50"
                  active={isFavourite}
                  onClick={() => setFavourite?.(item)}
                />
              </div>
            </div>
          </div>
          <div className="border h-full w-full flex flex-col justify-between border-l-0">
            <div className="p-4">
              <h5 className="font-semibold">{item.strDrink}</h5>
              <p className="text-sm text-gray-400 mb-1">{item.strCategory}</p>
              <div className="line-clamp-1 text-sm">{item.strInstructions}</div>
            </div>

            <button className="border-t w-full text-sm underline py-3">
              View More
            </button>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[calc(100vh-3rem)]">
        <CocktailFullDetailBlock drink={drink} />
      </DialogContent>
    </Dialog>
  );
}
