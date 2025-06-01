import Paragraph from "@tiptap/extension-paragraph";

// Approach 1: Extend the existing Paragraph to always render in your block structure
export const BlockParagraph = Paragraph.extend({
  name: "paragraph",

  // Add indent attribute for indentation
  addAttributes() {
    return {
      ...this.parent?.(),
      indent: {
        default: 0,
        parseHTML: (element) => {
          const blockParent = element.closest('[data-node-type="block"]');
          return blockParent
            ? parseInt(blockParent.getAttribute("data-indent") || "0")
            : 0;
        },
        renderHTML: () => ({}), // Don't render as HTML attribute, handle in renderHTML
      },
    };
  },

  parseHTML() {
    return [
      // Parse regular paragraphs
      { tag: "p" },
      // Parse paragraphs within your block structure
      { tag: 'div[data-node-type="content"] p' },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    const indent = node.attrs.indent || 0;

    return [
      "div",
      {
        "data-node-type": "block",
        "data-indent": indent,
        class: "block",
        style: `margin-left: ${indent * 24}px`,
      },
      [
        "div",
        {
          "data-node-type": "body",
          class: "body",
        },
        [
          "div",
          {
            "data-node-type": "content",
            class: "content",
          },
          ["p", HTMLAttributes, 0],
        ],
      ],
    ];
  },

  // Add keyboard shortcuts for indentation
  addKeyboardShortcuts() {
    return {
      Tab: () => this.editor.commands.indentParagraph(),
      "Shift-Tab": () => this.editor.commands.outdentParagraph(),
    };
  },

  // Add commands for indentation
  addCommands() {
    return {
      ...this.parent?.(),
      indentParagraph:
        () =>
        ({ tr, state, dispatch }) => {
          const { selection } = state;
          const { $from } = selection;

          // Find the paragraph node
          const paragraphPos = $from.before($from.depth);
          const paragraph = state.doc.nodeAt(paragraphPos);

          if (paragraph && paragraph.type.name === "paragraph") {
            const newIndent = Math.min(paragraph.attrs.indent + 1, 8);
            if (dispatch) {
              tr.setNodeMarkup(paragraphPos, undefined, {
                ...paragraph.attrs,
                indent: newIndent,
              });
            }
            return true;
          }
          return false;
        },

      outdentParagraph:
        () =>
        ({ tr, state, dispatch }) => {
          const { selection } = state;
          const { $from } = selection;

          const paragraphPos = $from.before($from.depth);
          const paragraph = state.doc.nodeAt(paragraphPos);

          if (paragraph && paragraph.type.name === "paragraph") {
            const newIndent = Math.max(paragraph.attrs.indent - 1, 0);
            if (dispatch) {
              tr.setNodeMarkup(paragraphPos, undefined, {
                ...paragraph.attrs,
                indent: newIndent,
              });
            }
            return true;
          }
          return false;
        },
    };
  },
});

// import { Node } from "@tiptap/core";

// export const MyParagraph = Node.create({
//   name: "myParagraph",
//   group: "block",
//   content: "block+",

//   parseHTML() {
//     return [
//       {
//         tag: "div[data-node-type='block']", // Matches the outer div
//         getAttrs: (element) => {
//           // element = the entire nested div structure
//           const pTag = element.querySelector("p"); // Finds the <p> inside

//           console.log("pTag", element, pTag, pTag.getAttribute("classname"));

//           return {
//             type: "block",
//             className: pTag?.getAttribute("classname") || null, // Gets "paragraph"
//           };
//         },
//       },
//     ];
//   },

//   renderHTML() {
//     return [
//       "div",
//       { class: "block", "data-node-type": "block" },
//       [
//         "div",
//         { class: "body", "data-node-type": "body" },
//         ["div", { class: "content", "data-node-type": "paragraph" }, 0],
//       ],
//     ];
//   },

//   addAttributes() {
//     return {
//       type: {
//         default: null,
//         renderHTML: () => {
//           return {};
//         },
//       },
//     };
//   },
// });
