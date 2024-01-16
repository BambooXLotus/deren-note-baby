"use client";

import { useState } from "react";

import { useMutation } from "convex/react";
import { useParams } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { type Id } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useEdgeStore } from "@/lib/edgestore";

import { SingleImageDropzone } from "../singe-image-dropzone";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";

export const CoverImageModal: React.FC = () => {
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();
  const update = useMutation(api.documents.update);
  const params = useParams();

  function onClose() {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  }

  async function handleChange(file?: File) {
    if (file && params.documentId) {
      const documentId = params.documentId as Id<"documents">;

      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImage.url,
        },
      });

      await update({
        id: documentId,
        coverImage: res.url,
      });

      onClose();
    }
  }

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={handleChange}
        />
      </DialogContent>
    </Dialog>
  );
};
