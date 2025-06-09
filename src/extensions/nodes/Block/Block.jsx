import { Node } from "@tiptap/core";
import { mergeAttributes } from "@tiptap/core";

import { assignIDPlugin } from "../../../plugins";

const Block = Node.create({
  name: "block",
  group: "block",
  content: "content group?",

  addAttributes() {
    return {
      "data-indent-level": {
        default: 0,
        parseHTML: (element) => element.getAttribute("data-indent-level"),
        renderHTML: (attributes) => ({
          "data-indent-level": attributes["data-indent-level"],
        }),
      },
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
      }),
      0,
    ];
  },
});

export default Block;
