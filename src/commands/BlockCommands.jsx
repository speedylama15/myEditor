import { Extension } from "@tiptap/core";
import { TextSelection } from "@tiptap/pm/state";

import { createBlock, createContent, createParagraph } from "../utils";

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
    };
  },
});

export default BlockCommands;
