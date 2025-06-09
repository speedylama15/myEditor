import { Node } from "@tiptap/core";
import { mergeAttributes } from "@tiptap/core";

const Content = Node.create({
  name: "content",
  group: "content",
  content: "paragraph?",

  // TODO: maybe I should add a plugin that assigns content type depending
  // TODO: on the element that exists inside?
  // TODO: but it's always going to be a p even if it's a list item so...not sure

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
    return [{ tag: 'div[data-node-type="content"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        class: "content",
        "data-node-type": "content",
      }),
      0,
    ];
  },
});

export default Content;
