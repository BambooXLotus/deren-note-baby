"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type HeadingProps = {
  id?: string;
};

export const Heading: React.FC<HeadingProps> = () => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">
        Your Ideas, Documents, & Plans. Unified. Welcome to{" "}
        <span className="underline">NoteBaby</span>
      </h1>
      <h3 className="text-base font-medium sm:text-xl md:text-2xl">
        Where notes dance to their own tune, a symphony of creativity and
        organization that hits like a chart-topping melody – your ideas, your
        rhythm, your baby.
      </h3>
      <Button>
        Enter NoteBaby <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
