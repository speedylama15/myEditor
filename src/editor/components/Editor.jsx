import { useEditor, EditorContent } from "@tiptap/react";

import { extensions, content, editorProps } from "..";

import "./Editor.css";

const Editor = () => {
  const editor = useEditor({
    extensions,
    content,
    editorProps,
  });

  return (
    <>
      <EditorContent editor={editor} className="editor-container" />
    </>
  );
};

export default Editor;
