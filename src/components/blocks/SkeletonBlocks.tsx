import { For } from "./LogicBlocks";
import { Skeleton } from "@/components/ui/skeleton";

export const CocktailSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-[125px] " />
      <div className="space-y-2 py-4 ">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-8" />
        <div className="flex items-center justify-center">
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
};

export const CocktailsSkeleton = () => {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        <For
          each={Array.from({ length: 6 })}
          render={(_, key) => <CocktailSkeleton key={key} />}
        />
      </div>
    </>
  );
};
