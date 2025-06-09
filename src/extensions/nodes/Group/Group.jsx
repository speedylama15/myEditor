import { Node } from "@tiptap/core";
import { mergeAttributes } from "@tiptap/core";

const Group = Node.create({
  name: "group",
  group: "group",
  content: "block+",

  addAttributes() {
    return {
      "data-node-type": {
        parseHTML: (element) => element.getAttribute("data-node-type"),
        renderHTML: (attributes) => ({
          "data-node-type": attributes["data-node-type"],
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-node-type="group"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        class: "group",
      }),
      0,
    ];
  },
});

export default Group;
