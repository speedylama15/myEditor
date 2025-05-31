import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import { OrderedList, ListItem } from "@tiptap/extension-list";
import { UndoRedo } from "@tiptap/extensions";

import { MyParagraph } from "./nodes/MyParagraph";
import { CustomBulletList, CustomListItem } from "./nodes/CustomBulletList";

import { IndentedParagraph } from "./nodes/IndentedParagraph";
import { basicList } from "./initialContent";

import "./Tiptap.css";

const extensions = [
  Document,
  MyParagraph,
  IndentedParagraph,
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

  console.log("SCHEMA", editor.schema);

  return (
    <>
      <EditorContent editor={editor} className="myEditor-container" />
    </>
  );
};

export default Tiptap;
