import { Node } from "@tiptap/core";
import { mergeAttributes } from "@tiptap/core";

import { assignIDPlugin } from "../../../plugins";

const Block = Node.create({
  name: "block",
  group: "block",
  content: "content group?",

  addAttributes() {
    return {
      "data-id": {
        default: null,
        parseHTML: (element) => element.getAttribute("data-id"),
        renderHTML: (attributes) => ({
          "data-id": attributes["data-id"],
        }),
      },
    };
  },

  addProseMirrorPlugins() {
    return [assignIDPlugin];
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
