"use client";

import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";

type HeadingProps = {
  id?: string;
};

export const Heading: React.FC<HeadingProps> = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

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
      {isLoading && (
        <div className="W-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter NoteBaby <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton>
          <Button>
            Get NoteBaby free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};
