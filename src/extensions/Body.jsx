import { Node, mergeAttributes } from "@tiptap/core";

export const Body = Node.create({
  name: "body",

  content: "content",

  parseHTML() {
    return [
      {
        tag: 'div.body[data-node-type="body"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-node-type": "body",
        class: "body",
      }),
      0,
    ];
  },
});
