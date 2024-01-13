"use client";

import { useRef, useState } from "react";

import { useMutation } from "convex/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { type Doc } from "@/convex/_generated/dataModel";

type TitleProps = {
  initialData: Doc<"documents">;
};

export const Title = ({ initialData }: TitleProps) => {
  const update = useMutation(api.documents.update);

  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData.title || "Untitled");

  function enableInput() {
    setTitle(initialData.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  }

  function disableInput() {
    setIsEditing(false);
  }

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    await update({
      id: initialData._id,
      title: event.target.value || "Untitled",
    });
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      disableInput();
    }
  }

  return (
    <div className="flex items-center gap-x-1">
      {!!initialData.icon && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input
          className="h-7 px-2 focus-visible:ring-transparent"
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={title}
        />
      ) : (
        <Button
          className="h-auto p-1 font-normal"
          size="sm"
          variant="ghost"
          onClick={enableInput}
        >
          <span className="truncate">{initialData.title}</span>
        </Button>
      )}
    </div>
  );
};

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-9 w-20 rounded-md" />;
};
