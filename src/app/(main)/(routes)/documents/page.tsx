"use client";

import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";

type DocumentsPageProps = {
  id?: string;
};

const DocumentsPage: React.FC<DocumentsPageProps> = () => {
  const { user } = useUser();
  const router = useRouter();

  const create = useMutation(api.documents.create);

  function handleCreate() {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`),
    );

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  }

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Image
        className="dark:hidden"
        src="/empty.png"
        height="300"
        width="300"
        alt="Empty"
      />
      <Image
        className="hidden dark:block"
        src="/empty-dark.png"
        height="300"
        width="300"
        alt="Empty"
      />
      <h2 className="text-lg font-medium">
        Welcome to {`${user?.firstName}'s NoteBaby`}
      </h2>
      <Button onClick={handleCreate}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
