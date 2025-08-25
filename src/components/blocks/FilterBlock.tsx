import { For } from "./LogicBlocks";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const letters = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
);

interface IProps {
  firstLetter: string;
  search: string;
  setFirstLetter: (s: string) => void;
  setSearch: (s: string) => void;
}

export default function FilterBlock({
  firstLetter,
  search,
  setFirstLetter,
  setSearch,
}: IProps) {
  return (
    <nav className="flex sm:flex-row gap-3 justify-between">
      <div className="sm:max-w-[40rem] hidden sm:block xl:max-w-[58rem] w-full pt-2 hide-horizontal-scrollbar overflow-x-auto">
        <ul className="flex gap-2 relative ">
          <For
            each={letters}
            render={(item, idx) => (
              <li key={idx}>
                <button
                  data-testid={`test-letter-${item}`}
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

      <div className="max-w-[5rem]">
        <Select
          defaultValue={firstLetter}
          onValueChange={(e) => setFirstLetter(e)}
        >
          <SelectTrigger className="w-full sm:hidden rounded-3xl">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>First letter</SelectLabel>
              {letters.map((e, i) => (
                <SelectItem key={i} value={e}>
                  {e}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className=" w-full mb-4 sm:mb-0 sm:max-w-[20rem]">
        <Input
          type="search"
          value={search}
          aria-label="Search cocktails"
          wrapperClass="w-full"
          placeholder="What are you looking for? "
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 rounded-4xl"
        />
      </div>
    </nav>
  );
}
