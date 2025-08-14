import type { DrinksResponse } from "@/lib/types";
import React from "react";
import AppImage from "../helpers/Image";

export interface IProps {
  item: DrinksResponse["drinks"][number];
}

export default function CocktailCard({ item }: IProps) {
  return (
    <div className=" flex flex-col justify-between">
      <AppImage src={item.strDrinkThumb} />
      <div className="border h-full flex flex-col justify-between border-t-0">
        <div className="p-4">
          <h5 className="font-semibold">{item.strDrink}</h5>
          <p className="text-sm text-gray-400 mb-1">{item.strCategory}</p>
          <div className="line-clamp-2 text-sm">{item.strInstructions}</div>
        </div>

        <button className="border-t w-full text-sm underline py-3">
          View More
        </button>
      </div>
    </div>
  );
}
