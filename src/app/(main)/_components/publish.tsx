"use client";

import { useState } from "react";

import { useMutation } from "convex/react";
import { CheckIcon, CopyIcon, RadioIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { type Doc } from "@/convex/_generated/dataModel";
import { useOrigin } from "@/hooks/use-origin";

type PublishProps = {
  initialData: Doc<"documents">;
};

export const Publish: React.FC<PublishProps> = ({ initialData }) => {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const origin = useOrigin();
  const update = useMutation(api.documents.update);

  const url = `${origin}/preview/${initialData._id}`;

  function handlePublish(publish: boolean) {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: publish,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Saving Publish...",
      success: publish ? "Note was published" : "Note removed published",
      error: "Failed to publish note.",
    });
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);

    toast("Copied", {
      position: "top-center",
    });
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"sm"} variant={"ghost"}>
          Publish
          {initialData.isPublished && (
            <RadioIcon className="ml-2 h-4 w-4 text-green-500" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <RadioIcon className="ml-2 h-4 w-4 animate-pulse text-green-500" />
              <p className="text-xs font-medium text-green-500">
                This note is live on web.
              </p>
            </div>
            <div className="flex items-center">
              <input
                className="h-8 flex-1 truncate rounded-l-md border bg-muted px-2 text-xs"
                value={url}
                disabled
              />
              <Button
                onClick={handleCopy}
                // disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              size="sm"
              className="w-full text-xs"
              disabled={isSubmitting}
              onClick={() => handlePublish(false)}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <RadioIcon className="mb-2 h-8 w-8 text-muted-foreground" />
            <p>Publish this note</p>
            <span className="mb-4 text-xs text-muted-foreground">
              Share your work with others.
            </span>
            <Button
              className="w-full text-xs"
              size={"sm"}
              disabled={isSubmitting}
              onClick={() => handlePublish(true)}
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
