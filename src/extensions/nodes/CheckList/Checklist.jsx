import { Node } from "@tiptap/core";
import { mergeAttributes } from "@tiptap/core";

const Checklist = Node.create({
  name: "checklist",
  group: "block checklist",
  content: "checklistItem",
  defining: true,

  addAttributes() {
    return {
      "data-content-type": {
        default: "paragraph",
        parseHTML: (element) => element.getAttribute("data-content-type"),
        renderHTML: (attributes) => {
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

  renderHTML({ node, HTMLAttributes }) {
    const contentType = node?.attrs["data-content-type"];
    // FIX
    console.log("RENDERING CONTENT", contentType);

    if (contentType === "checklist") {
      return [
        "div",
        mergeAttributes(HTMLAttributes, {
          class: "content",
          "data-node-type": "content",
        }),
        ["input", { type: "checkbox" }],
        ["p", { class: "checklist-text" }, 0], // The paragraph content goes here as a sibling to the input
      ];
    }

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

export default Checklist;
