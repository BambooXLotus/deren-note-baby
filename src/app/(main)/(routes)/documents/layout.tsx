"use client";

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

import { SearchCommand } from "@/components/search-command";
import { Spinner } from "@/components/spinner";

import { Navigation } from "../../_components/navigation";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="flex h-full dark:bg-[#1F1F1F]">
      <Navigation />
      <main className="h-full flex-1 overflow-auto">
        <SearchCommand />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
