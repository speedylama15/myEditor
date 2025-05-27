import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import { OrderedList, ListItem } from "@tiptap/extension-list";
import { UndoRedo } from "@tiptap/extensions";

import { CustomParagraph } from "./CustomParagraph";
import { CustomBulletList } from "./CustomBulletList";

import { basicList, complexList } from "./initialContent";

import "./Tiptap.css";

const extensions = [
  Document,
  CustomParagraph,
  Text,
  OrderedList,
  CustomBulletList,
  ListItem,
  UndoRedo,
];
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

  return (
    <>
      <EditorContent editor={editor} className="myEditor-container" />
    </>
  );
};

export default Tiptap;
