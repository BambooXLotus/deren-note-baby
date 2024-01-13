"use client";

import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { type Id } from "@/convex/_generated/dataModel";

import { Title } from "./title";

type NavbarProps = {
  isCollapsed: boolean;
  onResetWidth: () => void;
};

export const Navbar: React.FC<NavbarProps> = ({
  isCollapsed,
  onResetWidth,
}) => {
  const params = useParams();

  const documentId = params.documentId as Id<"documents">;

  const document = useQuery(api.documents.getById, {
    documentId,
  });

  if (document === undefined) {
    return (
      <nav className="flex w-full items-center justify-between bg-background px-3 py-2 dark:bg-[#1F1F1F]">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          {/* <Menu.Skeleton /> */}
        </div>
      </nav>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      <nav className="flex w-full items-center gap-x-4 bg-background px-3 py-2 dark:bg-[#1F1F1F]">
        {isCollapsed && (
          <MenuIcon
            className="h-6 w-6 text-muted-foreground"
            role="button"
            onClick={onResetWidth}
          />
        )}
        <div className="flex w-full items-center justify-between">
          <Title initialData={document} />
        </div>
      </nav>
    </>
  );
};
