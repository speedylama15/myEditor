import { Extension } from "@tiptap/core";

const canSingleBlockIndent = (tr, bB, bIndentLevel) => {
  const { nodeBefore: prevBlock } = tr.doc.resolve(bB);

  if (
    !prevBlock ||
    parseInt(prevBlock.attrs["data-indent-level"]) < bIndentLevel
  ) {
    return false;
  }

  return true;
};

const Shortcuts = Extension.create({
  name: "shortcuts",

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        return editor.commands.splitParagraphBlock();
      },
      Tab: ({ editor }) => {
        const { state } = editor;
        const { selection, tr } = state;
        const { $from, $to } = selection;

        const b = $from.node($from.depth - 2);
        const bB = $from.before($from.depth - 2);
        const bIndentLevel = parseInt(b.attrs["data-indent-level"]);

        if ($from.pos === $to.pos) {
          if (canSingleBlockIndent(tr, bB, bIndentLevel))
            return editor.commands.indentSingleBlock();
        }

        if ($from.pos !== $to.pos) {
          return editor.commands.indentMultipleBlocks();
        }

        return true;
      },
      "Shift-Tab": ({ editor }) => {
        return editor.commands.outdentBlocks();
        // return editor.commands.outdentBlock();
      },
    };
  },
});

export default Shortcuts;
