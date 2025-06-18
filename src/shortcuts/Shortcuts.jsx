import { Extension } from "@tiptap/core";

const Shortcuts = Extension.create({
  name: "shortcuts",

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        return editor.commands.splitParagraphBlock();
      },
      Tab: ({ editor }) => {
        return editor.commands.indentBlock();
      },
      "Shift-Tab": ({ editor }) => {
        return editor.commands.outdentBlock();
      },
    };
  },
});

export default Shortcuts;
