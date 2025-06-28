import { Extension } from "@tiptap/core";

import {
  createBlock,
  createContent,
  createParagraph,
  traverseDocument_outdent,
  traverseDocument_indent,
} from "../utils";
import { TextSelection } from "@tiptap/pm/state";

const BlockCommands = Extension.create({
  name: "blockCommands",

  addCommands() {
    return {
      // IDEA: splitParagraphBlock
      splitParagraphBlock:
        () =>
        ({ tr, dispatch, editor }) => {
          const { $from, $to } = editor.state.selection;

          const b = $from.node($from.depth - 2);
          const c = $from.node($from.depth - 1);
          const bA = $from.after($from.depth - 2);

          const p = $from.node($from.depth);
          const pS = $from.start($from.depth);
          const pE = pS - 1 + p.nodeSize;

          if ($from.pos === $to.pos) {
            const top = p.content.cut(0, $from.parentOffset);
            const bottom = p.content.cut($from.parentOffset);

            const nP = createParagraph(editor, bottom);
            const nC = createContent(editor, "paragraph", nP, c.attrs);
            const nB = createBlock(editor, nC, b.attrs);

            tr.replaceWith(pS, pE, top);
            tr.insert(tr.mapping.map(bA), nB);
            tr.setSelection(
              TextSelection.create(tr.doc, tr.mapping.map(bA, -1) + 3)
            );

            dispatch(tr);

            return true;
          }
        },

      // IDEA: indentBlock
      indentBlock:
        () =>
        ({ state, tr, dispatch }) => {
          const { selection } = state;
          const { $from } = selection;

          const cNode = $from.node($from.depth - 2);
          const pos = $from.before($from.depth - 2);
          const cIndentLevel = parseInt(cNode.attrs["data-indent-level"]);
          const resolvedPos = tr.doc.resolve(pos);
          const pNode = resolvedPos?.nodeBefore;
          const pIndentLevel = parseInt(pNode?.attrs["data-indent-level"]);

          // REVIEW: do nothing
          if (!pNode) return true;
          if (cIndentLevel > pIndentLevel) return true;

          tr.setNodeMarkup(pos, null, {
            ...cNode.attrs,
            "data-indent-level": cIndentLevel + 1,
          });

          dispatch(tr);

          return true;
        },

      // IDEA: indentBlocks
      indentBlocks:
        () =>
        ({ tr, dispatch, editor }) => {
          let processed = false;

          traverseDocument_indent(editor, (node, pos) => {
            const {
              node: cNode,
              isSelected: cIsSelected,
              canIndent: cCanIndent,
            } = node;

            if (!cIsSelected && processed) return true;
            if (cIsSelected) processed = true;

            const cIndentLevel = parseInt(cNode?.attrs["data-indent-level"]);

            if (cCanIndent && cIndentLevel < 7) {
              tr.setNodeMarkup(pos, null, {
                ...node.attrs,
                "data-indent-level": cIndentLevel + 1,
              });
            }
          });

          dispatch(tr);

          return true;
        },

      // IDEA: outdentBlock
      outdentBlock:
        () =>
        ({ tr, dispatch, editor }) => {
          let fNode = null;
          let iteration = 0;

          traverseDocument_outdent(editor, (node, pos) => {
            const { node: cNode } = node;
            const cIndentLevel = parseInt(cNode?.attrs["data-indent-level"]);

            if (iteration === 0) fNode = cNode;

            const fIndentLevel = parseInt(fNode?.attrs["data-indent-level"]);

            if (fIndentLevel === 0) return true;
            if (fIndentLevel >= cIndentLevel && iteration > 0) return true;

            if (iteration === 0 || fIndentLevel < cIndentLevel) {
              tr.setNodeMarkup(pos, null, {
                ...cNode.attrs,
                "data-indent-level": cIndentLevel - 1,
              });
            }

            iteration++;
          });

          dispatch(tr);

          return true;
        },

      // IDEA: outdentBlocks
      outdentBlocks:
        () =>
        ({ tr, dispatch, editor }) => {
          let finalNode = null;

          traverseDocument_outdent(editor, (node, pos, nextPos, prevNode) => {
            const { node: cNode, isSelected: cIsSelected } = node;
            const { isSelected: pIsSelected } = prevNode;
            const cIndentLevel = parseInt(cNode?.attrs["data-indent-level"]);

            if (pIsSelected && !cIsSelected) finalNode = prevNode;

            if (finalNode) {
              const { node: fNode } = finalNode;

              const fIndentLevel = parseInt(fNode?.attrs["data-indent-level"]);

              if (fIndentLevel === 0) return true;
              if (fIndentLevel >= cIndentLevel) return true;
              if (fIndentLevel < cIndentLevel) {
                tr.setNodeMarkup(pos, null, {
                  ...node.attrs,
                  "data-indent-level": cIndentLevel - 1,
                });
              }
            }

            if (cIndentLevel !== 0 && cIsSelected) {
              tr.setNodeMarkup(pos, null, {
                ...cNode.attrs,
                "data-indent-level": cIndentLevel - 1,
              });
            }
          });

          dispatch(tr);

          return true;
        },

      revertToParagraph:
        () =>
        ({ tr, dispatch, state }) => {
          const { selection } = state;
          const { $from } = selection;

          const cPos = $from.before($from.depth - 1);

          tr.setNodeAttribute(cPos, "data-content-type", "paragraph");

          dispatch(tr);

          return true;
        },
    };
  },
});

export default BlockCommands;
