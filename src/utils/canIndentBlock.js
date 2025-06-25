import { blockHierarchyPluginKey } from "../plugins/blockHierarchyPlugin";

const canIndentBlock = (pos, node, state, prevNode, isFirst) => {
  let canIndent = false;

  const pIndentLevel = parseInt(prevNode.node?.attrs["data-indent-level"]);
  const cIndentLevel = parseInt(node?.attrs["data-indent-level"]);

  if (isFirst) {
    if (pIndentLevel >= cIndentLevel) canIndent = true;

    return canIndent;
  }

  if (pIndentLevel >= cIndentLevel) canIndent = true;
  if (prevNode.canIndent && cIndentLevel - pIndentLevel === 1) canIndent = true;

  const { levelMap } = blockHierarchyPluginKey.getState(state);

  const blocksAtLevel = levelMap[cIndentLevel];
  const index = blocksAtLevel.findIndex((data) => data.before === pos);
  if (index > 0) canIndent = true;

  return canIndent;
};

export default canIndentBlock;
