import { Extension } from "@tiptap/core";

import { createBlock, createContent, createParagraph } from "../utils";
import { TextSelection } from "@tiptap/pm/state";

const BlockCommands = Extension.create({
  name: "blockCommands",

  addCommands() {
    return {
      splitParagraphBlock:
        () =>
        ({ tr, dispatch, editor }) => {
          const { $from, $to } = editor.state.selection;

          const b = $from.node($from.depth - 2);
          const bA = $from.after($from.depth - 2);

          const p = $from.node($from.depth);
          const pS = $from.start($from.depth);
          const pE = pS - 1 + p.nodeSize;

          if ($from.pos === $to.pos) {
            const top = p.content.cut(0, $from.parentOffset);
            const bottom = p.content.cut($from.parentOffset);

            const nP = createParagraph(editor, bottom);
            const nC = createContent(editor, "paragraph", nP);
            const nB = createBlock(editor, nC, {
              "data-indent-level": b.attrs["data-indent-level"],
              "data-role": b.attrs["data-role"],
            });

            tr.replaceWith(pS, pE, top);
            tr.insert(tr.mapping.map(bA), nB);
            tr.setSelection(
              TextSelection.create(tr.doc, tr.mapping.map(bA, -1) + 3)
            );

            dispatch(tr);

            return true;
          }
        },

      indentBlock:
        () =>
        ({ state, tr, dispatch, editor }) => {
          const { selection } = state;
          const { $from } = selection;

          const b = $from.node($from.depth - 2);
          const c = $from.node($from.depth - 1);
          const bB = $from.before($from.depth - 2);
          const indentLevel = parseInt(b.attrs["data-indent-level"]);

          // IDEA: max indent level is 7
          if (indentLevel === 7) return true;

          const nB = createBlock(editor, c, {
            "data-indent-level": indentLevel + 1,
            "data-role": indentLevel + 1 === 0 ? "parent" : "child",
          });

          tr.replaceWith(bB, bB + b.nodeSize, nB);
          tr.setSelection(TextSelection.create(tr.doc, $from.pos));

          dispatch(tr);

          return true;
        },

      outdentBlock:
        () =>
        ({ state, tr, dispatch, editor }) => {
          const { selection } = state;
          const { $from } = selection;

          const b = $from.node($from.depth - 2);
          const c = $from.node($from.depth - 1);
          const bB = $from.before($from.depth - 2);
          const indentLevel = parseInt(b.attrs["data-indent-level"]);

          // IDEA: do nothing if indent level is 0
          if (indentLevel === 0) return true;

          const nB = createBlock(editor, c, {
            "data-indent-level": indentLevel - 1,
            "data-role": indentLevel - 1 === 0 ? "parent" : "child",
          });

          tr.replaceWith(bB, bB + b.nodeSize, nB);
          tr.setSelection(TextSelection.create(tr.doc, $from.pos));

          dispatch(tr);

          return true;
        },
    };
  },
});

export default BlockCommands;
