import { Node } from "@tiptap/core";
import { mergeAttributes } from "@tiptap/core";

export const JCContent = Node.create({
  name: "jcContent",
  group: "jcContent",
  content: "block+",

  addAttributes() {
    return {
      contentType: {
        default: "paragraph",
        parseHTML: (element) => element.getAttribute("data-content-type"),
        renderHTML: (attributes) => {
          return {
            "data-content-type": attributes.contentType,
          };
        },
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-node-type="jc-content"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        class: "jc-content",
        "data-node-type": "jc-content",
      }),
      0,
    ];
  },
});
