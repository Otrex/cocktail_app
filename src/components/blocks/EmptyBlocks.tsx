import { Martini, SearchX, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type CocktailEmptyStateProps = {
  query?: string;
  onClearFilters?: () => void;
  onBrowsePopular?: () => void;
  onRetry?: () => void;
};

export const CocktailEmptyBlock = ({
  query,
  onClearFilters,
  onBrowsePopular,
  onRetry,
}: CocktailEmptyStateProps) => {
  return (
    <div
      data-testid="cocktails-empty"
      className="flex min-h-[60vh] items-center justify-center p-4"
    >
      <div className="w-full max-w-xl">
        <Card className="border-none shadow-none">
          <CardHeader className="text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-muted">
              <SearchX className="h-9 w-9" aria-hidden />
            </div>
            <CardTitle className="mt-4 text-2xl">No cocktails found</CardTitle>
            <CardDescription>
              {query ? (
                <span>
                  We couldn&apos;t find any matches for{" "}
                  <span className="font-medium">“{query}”</span>.
                </span>
              ) : (
                <span>
                  We couldn&apos;t find any drinks that match your filters.
                </span>
              )}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              <li>Check your spelling or try fewer cocktails.</li>
              <li>Browse a classic to get started quickly.</li>
            </ul>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="cursor-default select-none">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                Popular picks
              </Badge>
              {[
                "Margarita",
                "Negroni",
                "Old Fashioned",
                "Mojito",
                "Daiquiri",
              ].map((name) => (
                <Button
                  key={name}
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                  onClick={onBrowsePopular}
                >
                  <Martini className="mr-1.5 h-4 w-4" /> {name}
                </Button>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="sm" onClick={onClearFilters}>
                Clear filters
              </Button>
              <Button size="sm" variant="secondary" onClick={onRetry}>
                Try search again
              </Button>
              <Button size="sm" variant="outline" onClick={onBrowsePopular}>
                Browse popular cocktails
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
