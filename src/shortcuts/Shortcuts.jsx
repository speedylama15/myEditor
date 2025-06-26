import { Extension } from "@tiptap/core";

const Shortcuts = Extension.create({
  name: "shortcuts",

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        // FIX: what if it's range selected?
        return editor.commands.splitParagraphBlock();
      },

      // FIX: when list item to paragraph
      // FIX: when removing a block, what happens to the blocks below?
      // FIX: when deleting a chunk of blocks, blocks that were below need to be organized. How?
      Backspace: () => {},

      Tab: ({ editor }) => {
        const { state } = editor;
        const { selection } = state;
        const { $from, $to } = selection;

        if ($from.pos === $to.pos) {
          return editor.commands.indentBlock();
        }

        if ($from.pos !== $to.pos) {
          return editor.commands.indentBlocks();
        }

        return true;
      },

      // FIX: parentOffset is 0 -> does not work
      "Shift-Tab": ({ editor }) => {
        const { state } = editor;
        const { selection } = state;
        const { $from, $to } = selection;

        if ($from.pos === $to.pos) {
          return editor.commands.outdentBlock();
        }

        if ($from.pos !== $to.pos) {
          return editor.commands.outdentBlocks();
        }
      },
    };
  },
});

export default Shortcuts;
