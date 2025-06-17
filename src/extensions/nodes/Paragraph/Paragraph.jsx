import { Node } from "@tiptap/core";

const Paragraph = Node.create({
  name: "paragraph",
  group: "paragraph",
  content: "inline*",
  marks: "bold italic underline",

  parseHTML() {
    return [{ tag: "p" }, { tag: 'div[data-content-type="paragraph"]' }];
  },

  renderHTML() {
    return ["p", { class: "inline-content" }, 0];
  },

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        return editor.commands.splitBlock();
      },
      Backspace: ({ editor }) => {
        return editor.commands.mergeBlocks();
      },
    };
  },
});

export default Paragraph;
