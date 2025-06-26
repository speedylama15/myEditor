import { Node } from "@tiptap/core";
import { mergeAttributes } from "@tiptap/core";

const Content = Node.create({
  name: "content",
  group: "content",
  // FIX: make it more general?
  content: "paragraph?",
  // REVIEW: without it, pasted content node will get constructed with default attribute values
  defining: true,

  // TODO: maybe I should add a plugin that assigns content type depending
  // TODO: on the element that exists inside?
  // TODO: but it's always going to be a p even if it's a list item so...not sure
  // IDEA: within the content div, there can be other elements like a div that looks like a checkbox

  addAttributes() {
    return {
      "data-content-type": {
        default: "paragraph",
        parseHTML: (element) => element.getAttribute("data-content-type"),
        renderHTML: (attributes) => {
          console.log("parse", attributes);
          return {
            "data-content-type": attributes["data-content-type"],
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
