import { Extension } from "@tiptap/core";

import {
  createBlock,
  createContent,
  createParagraph,
  traverseDocument,
} from "../utils";
import { TextSelection } from "@tiptap/pm/state";
import { blockHierarchyPluginKey } from "../plugins/blockHierarchyPlugin";

// TODO: assess the first block out of many blocks selected
const assessFirstSelectedBlock = (tr, beforePos, node) => {
  const { nodeBefore } = tr.doc.resolve(beforePos);

  const currentIndentLevel = parseInt(node.attrs["data-indent-level"]);
  const prevIndentLevel = parseInt(nodeBefore?.attrs["data-indent-level"]);
  const canIndent = prevIndentLevel >= currentIndentLevel;
  const newIndentLevel = canIndent
    ? currentIndentLevel + 1
    : currentIndentLevel;

  return { node, canIndent, newIndentLevel };
};
// TODO: then comes the proceeding blocks and they have different conditions they can work with
const assessProceedingSelectedBlock = (
  state,
  beforePos,
  prevBlockData,
  node
) => {
  let canIndent = false;

  const { block: prevBlock, canIndent: canPrevBlockIndent } = prevBlockData;

  const currentIndentLevel = parseInt(node.attrs["data-indent-level"]);
  const prevIndentLevel = parseInt(prevBlock?.attrs["data-indent-level"]);

  if (currentIndentLevel - prevIndentLevel === 1 && canPrevBlockIndent)
    canIndent = true;

  if (prevIndentLevel >= currentIndentLevel) canIndent = true;

  const { levelMap: blockHierarchy } = blockHierarchyPluginKey.getState(state);
  const blocksAtLevel = blockHierarchy[currentIndentLevel];
  const index = blocksAtLevel.findIndex((data) => data.before === beforePos);
  if (index > 0) canIndent = true;

  const newIndentLevel = canIndent
    ? currentIndentLevel + 1
    : currentIndentLevel;

  return { node, canIndent, newIndentLevel };
};

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

      // TODO: indentMultipleBlocks
      indentMultipleBlocks:
        () =>
        ({ state, tr, dispatch }) => {
          const { selection } = state;
          const { from, to } = selection;

          let prevBlockData = null;

          state.doc.nodesBetween(from, to, (node, pos) => {
            if (node.type.name === "block") {
              if (prevBlockData === null) {
                const { canIndent, newIndentLevel } = assessFirstSelectedBlock(
                  tr,
                  pos,
                  node
                );

                prevBlockData = { block: node, canIndent, newIndentLevel };

                // FIX: I need to make sure that the maximum indent is 7
                // FIX: I need to make sure that the truly selected blocks only get indented
                tr.setNodeMarkup(pos, null, {
                  ...node.attrs,
                  "data-indent-level": newIndentLevel,
                });
              } else {
                const { canIndent, newIndentLevel } =
                  assessProceedingSelectedBlock(
                    state,
                    pos,
                    prevBlockData,
                    node
                  );

                prevBlockData = { block: node, canIndent, newIndentLevel };

                tr.setNodeMarkup(pos, null, {
                  ...node.attrs,
                  "data-indent-level": newIndentLevel,
                });
              }

              return false;
            }
          });

          dispatch(tr);

          return true;
        },

      // IDEA: indentSingleBlock
      indentSingleBlock:
        () =>
        ({ state, tr, dispatch, editor }) => {
          const { selection } = state;
          const { $from } = selection;

          const b = $from.node($from.depth - 2);
          const c = $from.node($from.depth - 1);
          const bB = $from.before($from.depth - 2);
          const indentLevel = parseInt(b.attrs["data-indent-level"]);

          const nB = createBlock(editor, c, {
            "data-indent-level": indentLevel + 1,
            "data-role": indentLevel + 1 === 0 ? "parent" : "child",
          });

          tr.replaceWith(bB, bB + b.nodeSize, nB);
          tr.setSelection(TextSelection.create(tr.doc, $from.pos));

          dispatch(tr);

          return true;
        },

      // IDEA: outdentBlock
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
            ...b.attrs,
            "data-indent-level": indentLevel - 1,
            "data-role": indentLevel - 1 === 0 ? "parent" : "child",
          });

          tr.replaceWith(bB, bB + b.nodeSize, nB);
          tr.setSelection(TextSelection.create(tr.doc, $from.pos));

          dispatch(tr);

          return true;
        },

      outdentBlocks:
        () =>
        ({ state, tr, dispatch, editor }) => {
          const { selection } = state;
          const { $from, from, to } = selection;

          let finalNode = null;

          traverseDocument(editor, (node, pos, nextPos, prevNode) => {
            const { node: cNode, isSelected: cIsSelected } = node;
            const { isSelected: pIsSelected } = prevNode;
            const cIndentLevel = parseInt(cNode?.attrs["data-indent-level"]);

            if (pIsSelected && !cIsSelected) finalNode = prevNode;

            if (finalNode) {
              const { node: fNode } = finalNode;

              const fIndentLevel = parseInt(fNode?.attrs["data-indent-level"]);

              if (fIndentLevel === 0) return true;
            }

            if (cIndentLevel !== 0 && cIsSelected) {
              tr.setNodeMarkup(pos, null, {
                ...cNode.attrs,
                "data-indent-level": cIndentLevel - 1,
              });
            }

            // console.log({
            //   node: node.node?.textContent,
            //   nodeIsSelected: node.isSelected,
            //   prevNode: prevNode.node?.textContent,
            //   prevNodeSelected: prevNode.isSelected,
            // });
          });

          // if (!isProceedingBlock) {
          //   if (prevBlock?.isSelected && !isSelected) {
          //     isProceedingBlock = true;
          //     finalSelectedBlock = prevBlock;
          //   }
          // }

          //         if (isProceedingBlock) {
          // if (currentIndentLevel > finalSelectedBlock?.indentLevel) {
          //   tr.setNodeMarkup(before, null, {
          //     ...node.attrs,
          //     "data-indent-level": currentIndentLevel - 1,
          //   });
          // } else {
          //   break
          // }

          dispatch(tr);

          return true;
        },

      // outdentBlocks:
      //   () =>
      //   ({ state, tr, dispatch }) => {
      //     const { selection } = state;
      //     const { $from, from, to } = selection;

      //     let before = $from.before($from.depth - 2);
      //     const $pos = tr.doc.resolve(before);
      //     let prevBlock = null;
      //     let finalSelectedBlock = null;
      //     let isProceedingBlock = false;
      //     const blockIndex = $pos.index();

      //     for (let i = blockIndex; i < state.doc.children.length; i++) {
      //       const node = state.doc.children[i];
      //       const currentIndentLevel = parseInt(
      //         node.attrs["data-indent-level"]
      //       );

      //       before = before + node.nodeSize;

      //       const startOfParagraphNode = before + 3;
      //       const endOfParagraphNode = before + node.nodeSize - 3;

      //       const isSelected =
      //         startOfParagraphNode >= from && endOfParagraphNode <= to;

      //       if (isSelected) {
      //         // FIX: before can be inaccurate
      //         tr.setNodeMarkup(before, null, {
      //           ...node.attrs,
      //           "data-indent-level": currentIndentLevel - 1,
      //         });
      //       }

      //       if (!isProceedingBlock) {
      //         if (prevBlock?.isSelected && !isSelected) {
      //           isProceedingBlock = true;
      //           finalSelectedBlock = prevBlock;
      //         }
      //       }

      //       if (isProceedingBlock) {
      //         if (currentIndentLevel > finalSelectedBlock?.indentLevel) {
      //           tr.setNodeMarkup(before, null, {
      //             ...node.attrs,
      //             "data-indent-level": currentIndentLevel - 1,
      //           });
      //         } else {
      //           break;
      //         }
      //       }

      //       prevBlock = {
      //         node: node.textContent,
      //         isSelected,
      //         indentLevel: currentIndentLevel,
      //       };

      //       console.log({
      //         node: node.textContent,
      //         isSelected,
      //         isProceedingBlock,
      //         finalSelectedBlock,
      //       });
      //     }

      //     dispatch(tr);

      //     return true;
      //   },
    };
  },
});

export default BlockCommands;

// const { state } = editor;
// const { selection, tr } = state;
// const { $from, from, to } = selection;

// traverseDocument(editor, (node, pos, nextPos, prevNode) => {
//   console.log({
//     node: node.node?.textContent,
//     nodeIsSelected: node.isSelected,
//     prevNode: prevNode.node?.textContent,
//     prevNodeSelected: prevNode.isSelected,
//   });
// });

// return true;
