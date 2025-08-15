import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./components/ui/breadcrumb";
import FilterBlock from "./components/blocks/FilterBlock";
import AsyncLoader, { For, If } from "./components/blocks/LogicBlocks";
import type { NormalizedDrink } from "./lib/types";
import CocktailCard from "./components/cards/CocktailCard";

import { CocktailsSkeleton } from "./components/blocks/SkeletonBlocks";
import { CocktailErrorBlock } from "./components/blocks/ErrorBlocks";
import { CocktailEmptyBlock } from "./components/blocks/EmptyBlocks";
import FavouritesBlock from "./components/blocks/FavouriteBlock";
import { toQueryParams } from "./lib/utils";
import { useFavorites } from "./contexts/FavoritesContext";
import { useGetCocktailsQuery } from "./services/cocktail";
import useUrlState from "./hooks/useUrlState";
import useDebouncedState from "./hooks/useDebouncedState";
import { PieCharts } from "./components/charts/PieCharts";

const CocktailLoader = AsyncLoader<NormalizedDrink[]>;

export default function App() {
  const { isFavorite, toggleFavorite, favorites } = useFavorites();
  const [firstLetter, setFirstLetter] = useUrlState("first-letter", "A");
  const [search, setSearch] = useUrlState("search", "");
  const debouncedSearch = useDebouncedState(search, 500);
  const { data, isFetching, isError } = useGetCocktailsQuery(
    toQueryParams({
      search: debouncedSearch.length >= 3 ? debouncedSearch : "",
      firstLetter,
    })
  );

  return (
    <main className="main-container py-5 sm:py-10">
      <section data-name="breadcrumb" className="mb-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <span>Home</span>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <span className="font-semibold">Cocktails List</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <If condition={!!favorites.length}>
        <section data-name="favourite" className="mb-5">
          <FavouritesBlock drinks={favorites} />
        </section>
      </If>

      <section data-name="charts" className="mb-5">
        <h2 className="font-bold mb-3 text-xl">Statistics</h2>
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="border w-full">
            <PieCharts drinks={data || []} type="glass" />
          </div>
          <div className="border w-full">
            <PieCharts drinks={data || []} type="alcoholic" />
          </div>
          <div className="border w-full">
            <PieCharts drinks={data || []} type="category" />
          </div>
        </div>
      </section>

      <section data-name="filters" className="relative z-[1] translate-y-[1px]">
        <FilterBlock
          search={search}
          firstLetter={firstLetter}
          setFirstLetter={setFirstLetter}
          setSearch={setSearch}
        />
      </section>
      <section
        data-name="results"
        className="sm:border border-t py-4 relative transition-all sm:p-4"
      >
        <div className="flex justify-between">
          <h2 className="font-bold mb-3 text-xl">Cocktails</h2>
          <div>Total Results: {(data || []).length}</div>
        </div>
        <CocktailLoader
          data={data || []}
          isError={isError}
          isLoading={isFetching}
          hasData={(d) => !!d.length}
          loadingComponent={<CocktailsSkeleton />}
          errorComponent={<CocktailErrorBlock />}
          emptyComponent={<CocktailEmptyBlock />}
          render={(data) => (
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
              <For
                each={data}
                render={(item, index) => (
                  <CocktailCard
                    item={item}
                    key={index}
                    isFavourite={isFavorite(item.id)}
                    setFavourite={toggleFavorite}
                  />
                )}
              />
            </div>
          )}
        />
      </section>
    </main>
  );
}
