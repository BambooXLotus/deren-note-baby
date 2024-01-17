"use client";

import "@blocknote/core/style.css";

import { useTheme } from "next-themes";

import { useEdgeStore } from "@/lib/edgestore";
import { type BlockNoteEditor, type PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";

type EditorProps = {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
};

const Editor: React.FC<EditorProps> = ({
  onChange,
  initialContent,
  editable,
}) => {
  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,

    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
  });

  const { edgestore } = useEdgeStore();
  const { resolvedTheme } = useTheme();

  async function handleUpload(file: File) {
    const response = await edgestore.publicFiles.upload({
      file,
    });

    return response.url;
  }

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};

export default Editor;
