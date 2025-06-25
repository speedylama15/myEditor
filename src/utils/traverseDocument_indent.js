import canIndentBlock from "./canIndentBlock";
import isBlockSelected from "./isBlockSelected";

const traverseDocument_indent = (editor, callback) => {
  const { state } = editor;
  const { selection, tr } = state;
  const { $from, from, to } = selection;

  let pos = $from.before($from.depth - 2);
  const resolvedPos = tr.doc.resolve(pos);
  const startIndex = resolvedPos.index();
  const nodeBefore = resolvedPos?.nodeBefore;
  let prevNode = {
    node: nodeBefore,
    canIndent: false,
    isSelected: nodeBefore
      ? isBlockSelected(pos - nodeBefore.nodeSize, nodeBefore, from, to)
      : false,
  };

  for (let i = startIndex; i < tr.doc.children.length; i++) {
    const node = tr.doc.children[i];
    const nextPos = pos + node.nodeSize;
    const canIndent = canIndentBlock(
      pos,
      node,
      state,
      prevNode,
      i === startIndex
    );
    const isSelected = isBlockSelected(pos, node, from, to);

    if (callback({ node, isSelected, canIndent }, pos, nextPos, prevNode, i))
      break;

    prevNode = { node, isSelected, canIndent };
    pos = pos + node.nodeSize;
  }
};

export default traverseDocument_indent;
