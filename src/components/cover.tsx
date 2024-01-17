"use client";

import { useMutation } from "convex/react";
import { ImageIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { type Id } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

type CoverProps = {
  url?: string;
  preview?: boolean;
};

export const Cover = ({ url, preview }: CoverProps) => {
  const coverImage = useCoverImage();

  const params = useParams();

  const removeCoverImage = useMutation(api.documents.removeCoverImage);
  const { edgestore } = useEdgeStore();

  async function handleRemove() {
    if (url) {
      await edgestore.publicFiles.delete({
        url,
      });
    }

    if (params.documentId) {
      const documentId = params.documentId as Id<"documents">;

      await removeCoverImage({
        id: documentId,
      });
    }
  }

  return (
    <div
      className={cn(
        "group relative h-[35dvh] w-full",
        !url && "h-[12dvh]",
        !!url && "bg-muted",
      )}
    >
      {!!url && <Image src={url} fill alt="Cover" className="object-cover" />}
      {url && !preview && (
        <div className="absolute bottom-5 right-5 flex items-center gap-x-2 opacity-0 group-hover:opacity-100">
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-xs text-muted-foreground"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Change cover
          </Button>
          <Button
            className="rounded-full text-xs text-muted-foreground"
            variant="outline"
            size="sm"
            onClick={handleRemove}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="h-[12dvh] w-full" />;
};
