import { Node } from "@tiptap/core";

export const IndentedParagraph = Node.create({
  name: "indentedParagraph",
  group: "block",
  content: "paragraph+ block*",

  // REVIEW: for recognition of nodes
  parseHTML() {
    return [
      {
        tag: "div",
        getAttrs: (element) => {
          if (element.hasAttribute("data-indent")) return null;

          return false;
        },
      },
    ];
  },

  // Define attributes for indentation level
  addAttributes() {
    return {
      "data-indent": {
        default: 0,
        // REVIEW: to construct the attribute object
        parseHTML: (element) => {
          console.log(element.getAttribute("data-indent"));
          return parseInt(element.getAttribute("data-indent"));
        },
        // REVIEW: constructs HTMLAttributes object for Node's renderHTML
        renderHTML: (attributes) => {
          console.log("attributes", attributes);
          return {
            "data-indent": attributes["data-indent"],
          };
        },
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    console.log("HTMLAttributes", HTMLAttributes);
    return ["div", HTMLAttributes, 0];
  },

  addCommands() {
    return {
      setIndentedParagraph:
        (attributes) =>
        ({ commands }) => {
          return commands.setNode(this.name, attributes);
        },

      toggleIndentedParagraph:
        (level = 1) =>
        ({ commands, editor }) => {
          if (editor.isActive(this.name)) {
            // Convert back to regular paragraph
            return commands.setNode("paragraph");
          } else {
            // Convert paragraph to indented paragraph
            return commands.setIndentedParagraph({ level });
          }
        },

      increaseIndent:
        () =>
        ({ commands, editor }) => {
          const { selection } = editor.state;
          const { $from } = selection;
          const node = $from.node();

          if (editor.isActive(this.name)) {
            const currentLevel = node.attrs.level || 1;
            return commands.updateAttributes(this.name, {
              level: Math.min(currentLevel + 1, 6),
            });
          } else if (editor.isActive("paragraph")) {
            return commands.setIndentedParagraph({ level: 1 });
          }
          return false;
        },

      decreaseIndent:
        () =>
        ({ commands, editor }) => {
          const { selection } = editor.state;
          const { $from } = selection;
          const node = $from.node();

          if (editor.isActive(this.name)) {
            const currentLevel = node.attrs.level || 1;
            if (currentLevel <= 1) {
              return commands.setNode("paragraph");
            } else {
              return commands.updateAttributes(this.name, {
                level: currentLevel - 1,
              });
            }
          }
          return false;
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      Tab: () => {
        return this.editor.commands.increaseIndent();
      },
      "Shift-Tab": () => {
        return this.editor.commands.decreaseIndent();
      },
    };
  },
});
