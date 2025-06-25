import { Extension } from "@tiptap/core";

const Shortcuts = Extension.create({
  name: "shortcuts",

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        return editor.commands.splitParagraphBlock();
      },
      Tab: ({ editor }) => {
        const { state } = editor;
        const { selection } = state;
        const { $from, $to } = selection;

        if ($from.pos === $to.pos) {
          return editor.commands.indentSingleBlock();
        }

        if ($from.pos !== $to.pos) {
          return editor.commands.indentMultipleBlocks();
        }

        return true;
      },

      // FIX: parentOffset is 0 -> does not work
      "Shift-Tab": ({ editor }) => {
        return editor.commands.outdentBlock();
      },
    };
  },
});

export default Shortcuts;
