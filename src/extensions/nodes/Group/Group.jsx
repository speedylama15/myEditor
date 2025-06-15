import { Node } from "@tiptap/core";
import { mergeAttributes } from "@tiptap/core";

const Group = Node.create({
  name: "group",
  group: "group",
  content: "block+",

  addAttributes() {
    return {
      "data-indent-level": {
        default: 1,
        parseHTML: (element) => element.getAttribute("data-indent-level"),
        renderHTML: (attributes) => ({
          "data-indent-level": attributes["data-indent-level"],
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
        "data-node-type": "group",
      }),
      0,
    ];
  },
});

export default Group;
