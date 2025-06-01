import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import { UndoRedo } from "@tiptap/extensions";

import { Block } from "./extensions/Block";
import { Body } from "./extensions/Body";
import { Content } from "./extensions/Content";
import { BlockParagraph } from "./extensions/MyParagraph";

import { basicList } from "./initialContent";

import "./Tiptap.css";

const extensions = [Document, Paragraph, Text, UndoRedo];
const content = basicList;

const Tiptap = () => {
  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: "myEditor",
      },
    },
  });

  // FIX
  console.log("SCHEMA", editor.schema);

  return (
    <>
      <EditorContent editor={editor} className="myEditor-container" />
    </>
  );
};

export default Tiptap;
