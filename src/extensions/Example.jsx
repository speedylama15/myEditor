import { Node } from "@tiptap/core";
import { mergeAttributes } from "@tiptap/core";

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
