import { Node, mergeAttributes } from "@tiptap/core";

export const Content = Node.create({
  name: "content",

  content: "paragraph",

  parseHTML() {
    return [
      {
        tag: 'div.content[data-node-type="content"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-node-type": "content",
        class: "content",
      }),
      0,
    ];
  },
});
