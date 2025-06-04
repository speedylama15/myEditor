import { useEditor, EditorContent } from "@tiptap/react";
import Text from "@tiptap/extension-text";
import { UndoRedo } from "@tiptap/extensions";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";

import { JCDoc } from "./extensions/JCDoc";
import { JCBlock } from "./extensions/JCBlock";
import { JCContent } from "./extensions/JCContent";
import { JCGroup } from "./extensions/JCGroup";
import { JCParagraph } from "./extensions/JCParagraph";

import "./Tiptap.css";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      Text,
      Bold,
      Italic,
      Subscript,
      Superscript,
      Strike,
      Underline,
      Highlight,
      UndoRedo,
      JCDoc,
      JCBlock,
      JCContent,
      JCGroup,
      JCParagraph,
    ],
    content: "<p>A<strong>B</strong>C</p>",
    editorProps: {
      attributes: {
        class: "myEditor",
      },
    },
  });

  return (
    <>
      <EditorContent editor={editor} className="myEditor-container" />
    </>
  );
};

export default Tiptap;
