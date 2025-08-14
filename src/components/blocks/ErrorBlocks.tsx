import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { Button } from "../ui/button";

interface IProps {
  onReload?: () => void;
}

export const CocktailErrorBlock = ({ onReload }: IProps) => {
  return (
    <div className="flex items-center py-20 justify-center">
      <Alert variant="destructive" className="max-w-[25rem]">
        <AlertCircleIcon />
        <AlertTitle>Unable to load cocktails</AlertTitle>
        <AlertDescription>
          <p className="mb-4">
            We couldn&apos;t shake things up this time. Please check your
            connection or try again.
          </p>
          <Button
            onClick={() => onReload?.()}
            variant={"destructive"}
            size="sm"
          >
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
};
