import { useEditor, EditorContent } from "@tiptap/react";

import { extensions, placeholder, editorProps } from "..";

import "./Editor.css";

const Editor = () => {
  const editor = useEditor({
    extensions,
    content: placeholder,
    editorProps,
    enablePasteRules: false,
  });

  return (
    <>
      <EditorContent editor={editor} className="editor-container" />
    </>
  );
};

export default Editor;
