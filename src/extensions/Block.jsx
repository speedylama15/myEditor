import { Node, mergeAttributes } from "@tiptap/core";

export const Block = Node.create({
  name: "block",
  group: "block",
  content: "body",

  addAttributes() {
    return {
      indent: {
        default: 0,
        parseHTML: (element) =>
          parseInt(element.getAttribute("data-indent") || "0"),
        renderHTML: (attributes) => {
          return {
            "data-indent": attributes.indent,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div.block[data-node-type="block"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-node-type": "block",
        class: "block",
      }),
      0,
    ];
  },
});
