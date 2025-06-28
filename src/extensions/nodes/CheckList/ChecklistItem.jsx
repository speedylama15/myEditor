import { Node } from "@tiptap/core";
import { mergeAttributes } from "@tiptap/core";

const ChecklistItem = Node.create({
  name: "checklistItem",
  group: "checklistItem",
  content: "inline*",
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
    return [{ tag: 'div[data-content-type="checklist"]' }];
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

export default ChecklistItem;
