import { useEditor, EditorContent } from "@tiptap/react";
import Text from "@tiptap/extension-text";
import { UndoRedo } from "@tiptap/extensions";

import { JCDoc, JCBlock, JCGroup, JCParagraph } from "./extensions/Nodes";

import "./Tiptap.css";

const content = `
  <p>Hey</p>

  <div class="jc-block" data-node-type="jc-block">
    <div
      class="jc-content"
      data-node-type="jc-content"
      data-content-type="jc-paragraph"
    >
      <p class="jc-inline-content">Basic Paragraph Block</p>
    </div>

    <div class="jc-group" data-node-type="jc-group" data-indent-level="1">
      <div class="jc-block" data-node-type="jc-block">
        <div
          class="jc-content"
          data-node-type="jc-content"
          data-content-type="jc-paragraph"
        >
          <p class="jc-inline-content">Basic Paragraph Block 1 1</p>
        </div>

        <div class="jc-group" data-node-type="jc-group" data-indent-level="2">
          <div class="jc-block" data-node-type="jc-block">
            <div
              class="jc-content"
              data-node-type="jc-content"
              data-content-type="jc-paragraph"
            >
              <p class="jc-inline-content">Basic Paragraph Block 2 1</p>
            </div>
          </div>
        </div>
      </div>

      <div class="jc-block" data-node-type="jc-block">
        <div
          class="jc-content"
          data-node-type="jc-content"
          data-content-type="jc-paragraph"
        >
          <p class="jc-inline-content">Basic Paragraph Block 1 2</p>
        </div>
      </div>
    </div>
  </div>
`;

const Tiptap = () => {
  const editor = useEditor({
    extensions: [Text, UndoRedo, JCDoc, JCBlock, JCGroup, JCParagraph],
    content: content,
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
