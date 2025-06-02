import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import { UndoRedo } from "@tiptap/extensions";

import { MyDoc, MyBlock, MyGroup, MyParagraph } from "./extensions/MyBlock";

import "./Tiptap.css";

const content = `
  <p>Hey</p>

  <div data-node-type="block">
    <div data-node-type="paragraph">Paragraph</div>
  </div>

  <div data-node-type="block">
    <div data-node-type="paragraph">Indent: 0</div>

    <div data-node-type="group">
      <div data-node-type="block">
        <div data-node-type="paragraph">Indent: 1</div>
      </div>
    </div>
  </div>

  <div>
    <p>ABC</p>
    <p>DEF</p>
  </div>
`;

const Tiptap = () => {
  const editor = useEditor({
    extensions: [MyDoc, Text, UndoRedo, MyBlock, MyGroup, MyParagraph],
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
