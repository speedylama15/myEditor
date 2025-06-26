import isBlockSelected from "./isBlockSelected";

const traverseDocument_outdent = (editor, callback, skipIndexBy = 0) => {
  const { state } = editor;
  const { selection, tr } = state;
  const { $from, from, to } = selection;

  // REVIEW: this is block's before
  let pos = $from.before($from.depth - 2);
  const resolvedPos = tr.doc.resolve(pos);
  const startIndex = resolvedPos.index();
  const nodeBefore = resolvedPos?.nodeBefore;
  let prevNode = {
    node: nodeBefore,
    isSelected: nodeBefore
      ? isBlockSelected(pos - nodeBefore.nodeSize, nodeBefore, from, to)
      : false,
  };

  for (let i = startIndex + skipIndexBy; i < tr.doc.children.length; i++) {
    const node = tr.doc.children[i];
    const nextPos = pos + node.nodeSize;
    const isSelected = isBlockSelected(pos, node, from, to);

    if (callback({ node, isSelected }, pos, nextPos, prevNode, i)) break;

    prevNode = { node, isSelected };
    pos = pos + node.nodeSize;
  }
};

export default traverseDocument_outdent;
