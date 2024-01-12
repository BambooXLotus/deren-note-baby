"use client";

import { PlusCircle } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";

type DocumentsPageProps = {
  id?: string;
};

const DocumentsPage: React.FC<DocumentsPageProps> = () => {
  const { user } = useUser();

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
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
