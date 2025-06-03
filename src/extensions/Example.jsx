import { Node } from "@tiptap/core";
import { mergeAttributes } from "@tiptap/core";
import Paragraph from "@tiptap/extension-paragraph";

export const DivNode = Node.create({
  name: "block",
  group: "block",
  content: "blockP",

  parseHTML(param) {
    console.log("DIVNODE parseHTML", param);
    return [{ tag: "div" }];
  },

  renderHTML({ HTMLAttributes }) {
    console.log("DIVNODE renderHTML", HTMLAttributes);
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-node-type": "block" }),
      ["div", {}, 0],
    ];
  },
});

export const ParagraphNode = Node.create({
  name: "paragraphNode",
  group: "blockP",
  content: "inline*",

  parseHTML(param) {
    console.log("ParagraphNode parseHTML", param);
    return [{ tag: "p" }];
  },

  renderHTML({ HTMLAttributes }) {
    console.log("ParagraphNode renderHTML", HTMLAttributes);
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-node-type": "paragraph" }),
      0,
    ];
  },
});

export const CustomParagraphNode = Paragraph.extend({
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        // FIX
        console.log("Pressed Enter in Example Custom Paragraph", editor);

        const { state } = editor;
        const { selection } = state;
        const { $from } = selection;

        const currentDepth = $from.depth;
        const currentNode = $from.node(currentDepth);
        const parentNode = $from.node(currentDepth - 1);

        // FIX
        console.log("Selection Info in Example Custom Paragraph", {
          selection,
          $from,
          currentDepth,
          currentNode,
          parentNode,
        });

        return true;
      },
    };
  },
});
