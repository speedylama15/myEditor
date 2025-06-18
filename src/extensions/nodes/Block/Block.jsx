import { Node } from "@tiptap/core";
import { mergeAttributes } from "@tiptap/core";

const Block = Node.create({
  name: "block",
  group: "block",
  content: "content{1}",

  addAttributes() {
    return {
      "data-id": {
        default: null,
        parseHTML: (element) => element.getAttribute("data-id"),
        renderHTML: (attributes) => ({
          "data-id": attributes["data-id"],
        }),
      },
      "data-role": {
        default: "parent",
        parseHTML: (element) => element.getAttribute("data-role"),
        renderHTML: (attributes) => ({ "data-role": attributes["data-role"] }),
      },
      "data-indent-level": {
        default: 0,
        parseHTML: (element) => element.getAttribute("data-indent-level"),
        renderHTML: (attributes) => ({
          "data-indent-level": attributes["data-indent-level"],
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-node-type="block"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        class: "block",
        "data-node-type": "block",
      }),
      0,
    ];
  },
});

export default Block;
