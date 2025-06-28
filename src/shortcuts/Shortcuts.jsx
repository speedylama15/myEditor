import { Extension } from "@tiptap/core";

// IDEA: this is how I can insert content
// editor
//   ?.chain()
//   .focus()
//   .insertContent({
//     type: "checklistNv",
//     attrs: { contentType: "checklist", checked: false },
//     content: [{ type: "text", text: "New checklist item" }],
//   })
//   .run();

const Shortcuts = Extension.create({
  name: "shortcuts",

  addKeyboardShortcuts() {
    return {
      ".": ({ editor }) => {
        editor.commands.insertContent({
          type: "block",
          attrs: {},
          content: [
            {
              type: "content",
              attrs: {
                "data-content-type": "checklist",
              },
              content: [
                {
                  type: "paragraph",
                  attrs: {},
                  content: [{ type: "text", text: "text" }],
                },
              ],
            },
          ],
        });

        return true;
      },

      Enter: ({ editor }) => {
        return editor.commands.splitParagraphBlock();
      },

      Backspace: ({ editor }) => {
        const { state } = editor;
        const { selection, tr } = state;
        const { $from, $to } = selection;
        const { parentOffset } = $from;

        // FIX: clean this up
        // FIX: maybe I need to fix the logic up as well
        const b = $from.node($from.depth - 2);
        const cBIndentLevel = parseInt(b.attrs["data-indent-level"]);
        const bPos = $from.before($from.depth - 2);
        const bAfter = bPos + b.nodeSize;
        const resolvedPos = tr.doc.resolve(bAfter);
        const { nodeAfter } = resolvedPos;
        const nBIndentLevel = parseInt(nodeAfter?.attrs["data-indent-level"]);
        const c = $from.node($from.depth - 1);
        // const cPos = $from.before($from.depth - 1);
        const cType = c.attrs["data-content-type"];

        if (
          $from.pos === $to.pos &&
          parentOffset === 0 &&
          (cType === "bulletList" || cType === "numberedList")
        ) {
          return editor.commands.revertToParagraph();
        }

        if (
          cBIndentLevel < nBIndentLevel &&
          cBIndentLevel !== 0 &&
          parentOffset === 0
        ) {
          return editor.commands.outdentBlock();
        }
      },

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
