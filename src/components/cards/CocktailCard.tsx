import type { NormalizedDrink } from "@/lib/types";
import AppImage from "../helpers/Image";
import { IconButton } from "../ui/shadcn-io/icon-button";
import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CocktailFullDetailBlock } from "../blocks/CocktailFullDetailBlock";

export interface IProps {
  isFavourite?: boolean;
  horizontal?: boolean;
  item: NormalizedDrink;
  setFavourite?: (item: NormalizedDrink) => void;
}

export default function CocktailCard({
  item,
  horizontal = false,
  isFavourite = false,
  setFavourite,
}: IProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          data-testid="cocktail-card"
          className={cn(
            "flex justify-between fade-in",
            horizontal ? "flex-row" : "flex-col"
          )}
        >
          <div>
            <div
              className={cn(
                "aspect-square relative overflow-hidden",
                horizontal ? "w-[8rem] h-full" : "w-full"
              )}
            >
              <AppImage
                src={item.drinkThumb!}
                loading="lazy"
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
          <div
            className={cn(
              "border h-full w-full flex flex-col justify-between "
              // horizontal ? "border-l-0" : "border-t-0"
            )}
          >
            <div className="p-4">
              <h5 className="font-semibold">{item.name}</h5>
              <p className="text-sm text-gray-400 mb-1">{item.category}</p>
              <div className="line-clamp-2 text-sm">{item.instruction}</div>
            </div>

            <button className="border-t w-full text-sm underline py-3">
              View More
            </button>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent
        aria-describedby={"cocktail full details"}
        className="sm:max-w-4xl overflow-y-auto"
      >
        <DialogTitle hidden></DialogTitle>
        <CocktailFullDetailBlock drink={item} />
      </DialogContent>
    </Dialog>
  );
}
