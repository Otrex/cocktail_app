import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./components/ui/breadcrumb";
import FilterBlock from "./components/blocks/FilterBlock";
import AsyncLoader from "./components/blocks/LogicBlocks";
import type { DrinksResponse } from "./lib/types";
import CocktailCard from "./components/cards/CocktailCard";
import testData from "./lib/test-data";
import { CocktailsSkeleton } from "./components/blocks/SkeletonBlocks";
import { CocktailErrorBlock } from "./components/blocks/ErrorBlocks";
import { CocktailEmptyBlock } from "./components/blocks/EmptyBlocks";

const CocktailLoader = AsyncLoader<DrinksResponse["drinks"]>;

function App() {
  return (
    <main className="main-container sm:py-10">
      <section data-name="breadcrumb" className="mb-5">
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

      <section data-name="filters" className="relative z-[1] translate-y-[1px]">
        <FilterBlock />
      </section>
      <section data-name="results" className="border relative z-[0] p-4">
        <CocktailLoader
          data={testData.drinks}
          isLoading={false}
          isError={false}
          hasData={(d) => !!d.length}
          loadingComponent={<CocktailsSkeleton />}
          errorComponent={<CocktailErrorBlock />}
          emptyComponent={<CocktailEmptyBlock />}
          render={(data) => (
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
              {data.map((e) => (
                <CocktailCard item={e} />
              ))}
            </div>
          )}
        />
      </section>
    </main>
  );
}

export default App;
