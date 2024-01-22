"use client";

import "@blocknote/react/style.css";

import { useTheme } from "next-themes";

import { useEdgeStore } from "@/lib/edgestore";
import {
  type BlockNoteEditor,
  type DefaultBlockSchema,
  type DefaultInlineContentSchema,
  type DefaultStyleSchema,
  type PartialBlock,
} from "@blocknote/core";
import {
  BlockNoteView,
  getDefaultReactSlashMenuItems,
  useBlockNote,
} from "@blocknote/react";

type EditorProps = {
  onChange: (value: string) => void;
  initialContent?: string;
  isEditable?: boolean;
};

const Editor: React.FC<EditorProps> = ({
  onChange,
  initialContent,
  isEditable,
}) => {
  const customSlashMenuItemList = [...getDefaultReactSlashMenuItems()];

  const initialBlocks = initialContent
    ? (JSON.parse(initialContent) as PartialBlock<
        DefaultBlockSchema,
        DefaultInlineContentSchema,
        DefaultStyleSchema
      >[])
    : undefined;

  const editor: BlockNoteEditor = useBlockNote({
    editable: isEditable,
    initialContent: initialBlocks,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
    slashMenuItems: customSlashMenuItemList,
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
