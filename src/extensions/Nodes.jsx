import { Node } from "@tiptap/core";
import { mergeAttributes } from "@tiptap/core";

export const JCDoc = Node.create({
  name: "jcDoc",
  topNode: true,
  content: "jcBlock+",
});

export const JCBlock = Node.create({
  name: "jcBlock",
  group: "jcBlock",
  // IDEA: may have to adjust for checkboxes
  content: "jcContent jcGroup?",

  parseHTML() {
    return [{ tag: 'div[data-node-type="jc-block"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        class: "jc-block",
        "data-node-type": "jc-block",
      }),
      0,
    ];
  },

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        // FIX
        console.log("Pressed Enter", editor);

        const { state } = editor;
        const { selection } = state;
        const { $from } = selection;

        const currentDepth = $from.depth;
        const currentNode = $from.node(currentDepth);

        // FIX
        console.log("Selection Info", { currentDepth, currentNode });
      },
    };
  },
});

export const JCGroup = Node.create({
  name: "jcGroup",
  group: "jcGroup",
  // REVIEW: we'll have to see how this holds up to
  content: "jcBlock+",

  parseHTML() {
    return [{ tag: 'div[data-node-type="jc-group"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        class: "jc-group",
        "data-node-type": "jc-group",
        // IDEA: this needs adjustment
        "data-indent-level": 1,
      }),
      0,
    ];
  },
});

export const JCParagraph = Node.create({
  name: "jcParagraph",
  group: "jcContent",
  // REVIEW: this can change to block and inlines in the future
  content: "inline*",

  parseHTML() {
    return [{ tag: "p" }, { tag: 'div[data-content-type="paragraph"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        class: "jc-content",
        "data-node-type": "jc-content",
        "data-content-type": "paragraph",
      }),
      ["p", { class: "jc-inline-content" }, 0],
    ];
  },
});
