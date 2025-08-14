import React from "react";
import { For } from "./LogicBlocks";
import useUrlState from "@/hooks/useUrlState";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

const letters = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
);

export default function FilterBlock() {
  const [firstLetter, setFirstLetter] = useUrlState("first-letter", "A");
  const [search, setSearch] = useUrlState("search", "");

  return (
    <nav className="flex sm:flex-row justify-between">
      <div className="max-w-[50rem] w-full pt-2 hide-scrollbar-show-on-hover overflow-x-auto">
        <ul className="flex gap-2 relative ">
          <For
            each={letters}
            render={(item) => (
              <li>
                <button
                  onClick={() => setFirstLetter(item)}
                  className={cn(
                    "px-4 py-2.5 text-xs font-semibold",
                    firstLetter.toLowerCase() == item.toLowerCase() &&
                      "border-t border-x rounded-t-sm z-[10] bg-white"
                  )}
                >
                  {item}
                </button>
              </li>
            )}
          />
        </ul>
      </div>
      <div>
        <Input
          type="search"
          value={search}
          placeholder="What are you looking for? "
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-[40rem] dev w-full px-5 rounded-4xl"
        />
      </div>
    </nav>
  );
}
