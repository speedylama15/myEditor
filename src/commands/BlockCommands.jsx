import { Extension, NodePos } from "@tiptap/core";
import { TextSelection } from "@tiptap/pm/state";

import {
  createBlock,
  createContent,
  // createGroup,
  createParagraph,
} from "../utils";
import { Fragment } from "@tiptap/pm/model";

// const getContentNode = (node) => {
//   return node.content.content.find((node) => node.type.name === "content");
// };

// const getParagraphNode = (node) => {
//   return node.content.content.find((node) => node.type.name === "paragraph");
// };

const getNearestBlockDepth = ($from) => {
  let node = $from.node($from.depth);
  let depth = $from.depth - 1;

  while (node.type.name !== "block") {
    if (node.type.name === "block") {
      break;
    } else {
      depth--;
      node = $from.node(depth);
    }
  }

  return depth;
};

// const getCurrentIndentLevel = ($from, blockDepth) => {
//   const a = $from.node(blockDepth - 1);

//   return a.attrs["data-indent-level"] ? a.attrs["data-indent-level"] : 0;
// };

const getNodePos = (parentNode, nodeName, nodeStart) => {
  let before;
  let after;
  let start;
  let end;
  let node;

  // REVIEW: relative to the START of the node
  parentNode.descendants((n, pos) => {
    if (n.type.name === nodeName) {
      node = n;
      before = nodeStart + pos;
      start = before + 1;
      after = before + n.nodeSize;
      end = after - 1;

      return false;
    }
  });

  return { before, after, start, end, node };
};

const BlockCommands = Extension.create({
  name: "blockCommands",

  addCommands() {
    return {
      testing:
        () =>
        ({ tr, dispatch, editor }) => {
          const { $from } = editor.state.selection;
          const block = $from.node($from.depth - 2);
          const after = $from.after($from.depth - 2);

          const contentElement = block.content.content[0];

          console.log("Content Element", contentElement);

          // const newBlock = editor.schema.nodes.block.create({}, contentElement);
          const newBlock = block.type.create(
            block.attrs, // Preserve all attributes
            [contentElement],
            block.marks // Preserve marks if any
          );

          tr.insert(after, newBlock);

          dispatch(tr);

          return true;
        },

      mergeBlocks:
        () =>
        ({ tr, dispatch, editor }) => {
          const { $from, $to } = editor.state.selection;

          const blockDepth = getNearestBlockDepth($from);
          const blockNode = $from.node(blockDepth);
          const paragraphNode = $from.node($from.depth);

          const blockID = blockNode.attrs["data-id"];
          const firstBlockID = editor.$doc.content.content[0].attrs["data-id"];

          if (blockID === firstBlockID) return true;

          if ($from.parentOffset === 0 && $from.pos === $to.pos) {
            const $pos = tr.doc.resolve($from.before(blockDepth));
            const prevNode = $pos.nodeBefore;
            const before = $pos.pos - prevNode.nodeSize;
            const start = before + 1;

            const {
              start: s,
              end: e,
              node: n,
            } = getNodePos(prevNode, "paragraph", start);

            tr.replaceWith(s, e, n.content.append(paragraphNode.content));
            tr.delete($pos.pos, $pos.pos + $pos.nodeAfter.nodeSize);
            tr.setSelection(TextSelection.create(tr.doc, e));

            dispatch(tr);

            return true;
          }

          return false;
        },

      splitBlock:
        () =>
        ({ tr, dispatch, editor }) => {
          const { $from, $to } = editor.state.selection;

          const blockDepth = getNearestBlockDepth($from);
          const blockNode = $from.node(blockDepth);
          const after = $from.after(blockDepth);

          if ($from.pos === $to.pos) {
            const {
              node: paragraphNode,
              start: s,
              end: e,
            } = getNodePos(blockNode, "paragraph", $from.start(blockDepth));

            const top = paragraphNode.content.cut(0, $from.parentOffset);
            const bottom = paragraphNode.content.cut($from.parentOffset);

            const p = createParagraph(editor, bottom);
            const c = createContent(editor, "paragraph", p);
            const b = createBlock(editor, c);

            tr.replaceWith(s, e, top);
            tr.insert(tr.mapping.map(after), b);
            tr.setSelection(
              TextSelection.create(
                tr.doc,
                // REVIEW: -2 to get p node, then by the node size of p, but +1 to stay in the text node
                tr.mapping.map(after) - 2 - p.nodeSize + 1
              )
            );

            dispatch(tr);

            return true;
          }
        },

      indentBlock:
        () =>
        ({ tr, state, dispatch }) => {
          const { $from, $to, from, to } = state.selection;

          const range = $from.blockRange($to);

          const blocks = [];
          const blockHierarchy = {};
          let beforePos = Infinity;
          let afterPos = -Infinity;
          let groupIndentLevel = null;

          state.doc.nodesBetween(
            range.start,
            range.end,
            (node, pos, parent) => {
              let block;
              let blockToInsert;
              let canIndent;
              let indentLevel;
              let isSelected = false;
              let comesBefore = false;
              let comesAfter = false;

              if (node.type.name === "group") {
                groupIndentLevel = parseInt(node.attrs["data-indent-level"]);
              }

              if (parent.type.name === "doc") {
                groupIndentLevel = 0;
              }

              if (node.type.name === "paragraph") {
                return false;
              }

              if (node.type.name === "block") {
                beforePos = Math.min(beforePos, pos);
                afterPos = Math.max(afterPos, pos + node.nodeSize);

                // TODO: establish comeBefore, isSelected and comeAfter
                const contentNode = node.firstChild;
                const paragraphNode = contentNode.firstChild;
                const b = pos + 2;
                const a = b + paragraphNode.nodeSize;
                const s = b + 1;
                const e = a - 1;

                if (s >= from && e <= to) {
                  isSelected = true;
                }

                if (e < from || e === from) {
                  comesBefore = true;
                }
                if (s > to || s === to) {
                  comesAfter = true;
                }
                // TODO

                // TODO: process indentLevel, canIndent, blockToInsert
                if (comesBefore) {
                  // FIX
                  // block = node;
                  block = node.type.create(
                    node.attrs,
                    [node.content.content[0]],
                    node.marks
                  );
                  blockToInsert = null;
                  canIndent = false;
                  indentLevel = groupIndentLevel;
                  blockHierarchy[indentLevel] = block;
                }

                if (comesAfter) {
                  block = node.type.create(
                    node.attrs,
                    [node.content.content[0]],
                    node.marks
                  );
                  blockToInsert = blockHierarchy[groupIndentLevel - 1];
                  canIndent = false;
                  indentLevel = groupIndentLevel;
                  blockHierarchy[indentLevel] = block;
                }

                if (isSelected) {
                  block = node.type.create(
                    node.attrs,
                    [node.content.content[0]],
                    node.marks
                  );

                  if (blocks.length === 0 || indentLevel === 0) {
                    const { nodeBefore } = tr.doc.resolve(pos);

                    blockToInsert = nodeBefore;
                    canIndent = true;
                    indentLevel = groupIndentLevel + 1;

                    blockHierarchy[0] = nodeBefore;
                    blockHierarchy[indentLevel] = block;
                  } else {
                    const conditionalNode = blockHierarchy[groupIndentLevel];
                    canIndent = conditionalNode ? true : false;

                    if (canIndent) {
                      blockToInsert = conditionalNode;
                      indentLevel = groupIndentLevel + 1;
                    }

                    if (!canIndent) {
                      blockToInsert = blockHierarchy[groupIndentLevel - 1];
                      indentLevel = groupIndentLevel;
                    }

                    blockHierarchy[indentLevel] = block;
                  }
                }

                // TODO

                blocks.push({
                  block,
                  blockToInsert,
                  canIndent,
                  indentLevel,
                  isSelected,
                  comesAfter,
                  comesBefore,
                });

                // console.log({
                //   block: block?.textContent,
                //   blockToInsert: blockToInsert
                //     ? blockToInsert?.textContent
                //     : "none",
                //   canIndent,
                //   indentLevel,
                //   isSelected,
                //   comesBefore,
                //   comesAfter,
                // });
              }
            }
          );

          console.log(beforePos, afterPos);

          blocks.forEach((block, index) => {
            console.log(block);
          });

          dispatch(tr);

          return true;
        },
    };
  },
});

export default BlockCommands;

// IDEA: handle when indent level is originally 0
// IDEA: handle when dragging is a bit iffy

// const range = $from.blockRange($to, (node) => {
//   return node.type.name === "group" || node.type.name === "doc";
// });

// if (range.startIndex === 0) return true;

// const { depth, end, endIndex, parent, start, startIndex } = range;
// const prevBlock = parent.child(startIndex - 1);
// const currentBlock = parent.child(startIndex);

// let hasGroup = false;
// prevBlock.forEach((node) => {
//   if (node.type.name === "group") hasGroup = true;
// });

// tr.delete(start, end);

// if (hasGroup) {
//   tr.insert(start - 2, currentBlock);

//   tr.setSelection(
//     TextSelection.create(tr.doc, start - 2 + 3 + $from.parentOffset)
//   );
// } else {
//   tr.insert(
//     start - 1,
//     state.schema.nodes.group.create({ "data-indent-level": 1 }, [
//       currentBlock,
//     ])
//   );

//   tr.setSelection(
//     TextSelection.create(tr.doc, start - 1 + 4 + $from.parentOffset)
//   );
// }

// dispatch(tr);
