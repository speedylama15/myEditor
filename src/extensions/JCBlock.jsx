import { Node } from "@tiptap/core";
import { mergeAttributes } from "@tiptap/core";

export const JCBlock = Node.create({
  name: "jcBlock",
  group: "jcBlock",
  // IDEA: may have to adjust for checkboxes
  content: "jcContent jcGroup?",

  parseHTML() {
    return [{ tag: 'div[data-node-type="jc-block"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        class: "jc-block",
        "data-node-type": "jc-block",
      }),
      0,
    ];
  },
});
