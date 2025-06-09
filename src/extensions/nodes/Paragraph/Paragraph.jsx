import { Node } from "@tiptap/core";
import { Fragment } from "@tiptap/pm/model";
import { TextSelection } from "@tiptap/pm/state";

// REVIEW: \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const getNearestBlockDepth = ($from) => {
  const currentNodeDepth = $from.depth;
  let node = $from.node($from.depth);

  let blockNodeDepth = currentNodeDepth - 1;

  while (node.type.name !== "jcBlock") {
    if (node.type.name === "jcBlock") {
      break;
    } else {
      blockNodeDepth--;
      node = $from.node(blockNodeDepth);
    }
  }

  return blockNodeDepth;
};

// REVIEW: \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const getPreviousBlock = ($from, tr) => {
  const { depthSubtract } = getNearestBlockDepth($from);
  const before = $from.before($from.depth - depthSubtract);
  const beforeResolvedPos = tr.doc.resolve(before);
  const previousBlock = beforeResolvedPos.nodeBefore;
  const currentBlock = beforeResolvedPos.nodeAfter;

  return { before, beforeResolvedPos, previousBlock, currentBlock };
};

const getPositionsBasedOnAfter = (resolvedPos) => {
  const after = resolvedPos.pos;
  const before = after - resolvedPos?.nodeBefore?.nodeSize;
  const start = before + 1;
  const end = after - 1;

  return { after, before, start, end };
};

const Paragraph = Node.create({
  name: "paragraph",
  group: "paragraph",
  // REVIEW: this can change to block and inlines in the future
  content: "inline*",
  marks: "bold italic underline",

  parseHTML() {
    return [{ tag: "p" }, { tag: 'div[data-content-type="paragraph"]' }];
  },

  renderHTML() {
    return ["p", { class: "inline-content" }, 0];
  },

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        return editor.commands.splitParagraphBlock();
      },
      Backspace: ({ editor }) => {
        return editor.commands.mergeWithPreviousBlock();
      },
      "Shift-Tab": ({ editor }) => {
        const { state, schema, view } = editor;
        const { dispatch } = view;
        const { selection, tr } = state;
        const { $from } = selection;

        const blockDepth = getNearestBlockDepth($from);

        const group = $from.node(blockDepth - 1);

        if (group.type.name === "jcDoc") return true;

        const parentBlock = $from.node(blockDepth - 2);
        const parentBlockBeforePos = $from.before(blockDepth - 2);
        const parentBlockAfterPos = parentBlockBeforePos + parentBlock.nodeSize;

        const currentBlock = $from.node(blockDepth);
        const top = [];
        const below = [];
        let index = null;

        group.children.forEach((node, i) => {
          if (currentBlock.attrs["data-id"] === node.attrs["data-id"]) {
            index = i;
          }

          if (index === null) top.push(node);

          if (i > index) below.push(node);
        });

        const currentBlockGroup = currentBlock.children.find(
          (node) => node.type.name === "jcGroup"
        );

        const merged = [];
        currentBlockGroup?.content.content.forEach((node) => merged.push(node));
        below.forEach((node) => merged.push(node));

        const c = $from.node(blockDepth + 1);
        const g = schema.nodes.jcGroup.create({}, Fragment.from(merged));
        const b = schema.nodes.jcBlock.create({}, [c, g]);

        const canReplace = state.doc.canReplace(
          parentBlockBeforePos,
          parentBlockAfterPos,
          Fragment.from(b)
        );
        console.log("Can replace?", canReplace);

        // 2. Validate your new block
        try {
          b.check(); // This will throw if invalid
          console.log("Block is valid");
        } catch (error) {
          console.log("Block validation failed:", error, b);
        }

        tr.replaceWith(parentBlockBeforePos, parentBlockAfterPos, b);

        dispatch(tr);
      },
      Tab: ({ editor }) => {
        const { state, schema, view } = editor;
        const { dispatch } = view;
        const { selection, tr } = state;
        const { $from } = selection;

        const $before = $from.before(getNearestBlockDepth($from));
        const resolvedPos = tr.doc.resolve($before);
        const prevBlock = resolvedPos.nodeBefore;
        const currentBlock = resolvedPos.nodeAfter;
        const { after, before, start, end } =
          getPositionsBasedOnAfter(resolvedPos);

        if (!prevBlock) return true;

        let toCreateGroupNode = true;

        prevBlock.children.forEach((node) => {
          if (node.type.name === "jcGroup") toCreateGroupNode = false;
        });

        const bef = resolvedPos.pos;
        const aft = bef + currentBlock.nodeSize;

        // TODO: if it has a group node, then insert the block after the "after" of the last block within the group
        // TODO: if it does not have a group node, create it, insert block inside the group node and insert the newly created group node after the after of the content block
        if (toCreateGroupNode) {
          const groupNode = schema.nodes.jcGroup.create(
            {
              // FIX: do I have to provide this?
              // IDEA: if the previous block has a group, simply +1 it
              // IDEA: if it does not, then just apply 1
              // IDEA: check the indent level of groups
              "data-indent-level": 1,
              "data-node-type": "jc-group",
            },
            currentBlock
          );

          prevBlock.descendants((node, pos) => {
            if (node.type.name === "jcContent") {
              const contentAfterPos = before + pos + node.nodeSize;

              tr.insert(contentAfterPos, groupNode);
            }
          });

          const b = tr.mapping.map(bef);
          const a = tr.mapping.map(aft);

          tr.delete(b, a);

          dispatch(tr);
        }

        return true;
      },
    };
  },

  addCommands() {
    return {
      mergeWithPreviousBlock: () => (params) => {
        const { state, tr, dispatch } = params;
        const { selection } = state;
        const { $from } = selection;
        const { parentOffset } = $from;

        if (parentOffset === 0) {
          // TODO: get jcParagraph content
          const currentParagraphNode = $from.node($from.depth);
          const currentParagraphContent = currentParagraphNode.content;
          // REVIEW: pos is here -> |<div></div>
          const currentBlockNode = $from.node($from.depth - 2);
          const currentBlockNodeBeforePos = $from.before($from.depth - 2);
          const currentBlockNodeAfterPos =
            currentBlockNodeBeforePos + currentBlockNode.nodeSize;
          const resolvedPos = state.doc.resolve(currentBlockNodeBeforePos);

          const { pos, nodeBefore } = resolvedPos;

          let replaceStartPos;
          const replaceEndPos = pos - 3;
          let newContent;

          // FIX
          nodeBefore.descendants((node) => {
            if (node.type.name === "jcParagraph") {
              // IDEA: kinda important
              replaceStartPos = replaceEndPos - node.content.size;

              newContent = node.content.append(currentParagraphContent);
            }
          });

          tr.replaceWith(replaceStartPos, replaceEndPos, newContent);
          tr.delete(currentBlockNodeBeforePos, currentBlockNodeAfterPos);
          tr.setSelection(TextSelection.create(tr.doc, replaceEndPos));

          dispatch(tr);

          return true;
        }

        return false;
      },
      splitParagraphBlock:
        () =>
        ({ dispatch, tr, state }) => {
          const { selection, schema } = state;
          const { nodes } = schema;
          const { $from } = selection;
          const { parentOffset } = $from;

          const currentDepth = $from.depth;
          const currentNode = $from.node(currentDepth);

          // TODO: very important method
          // TODO: I believe this is a method of Fragment???
          const beforeContent = currentNode.content.cut(0, parentOffset);
          const afterContent = currentNode.content.cut(parentOffset);
          const currentStart = $from.start($from.depth);
          const currentEnd = $from.end($from.depth);

          // TODO: maybe it's possible to select the range where the text is
          // TODO: then I replace that with beforeContent which is a fragment
          tr.replaceWith(currentStart, currentEnd, beforeContent);

          const paragraph = nodes.jcParagraph.create({}, afterContent);
          const content = nodes.jcContent.create(
            { contentType: "paragraph" },
            paragraph
          );
          const block = nodes.jcBlock.create({}, content);

          // FIX: maybe I need a loop that figures out the depth of the block?
          // FIX: because checkbox list does have 2 divs inside of the content block
          const insertPos = tr.mapping.map($from.end($from.depth - 2));

          tr.insert(insertPos, block);

          const resolvedPos = tr.doc.resolve(insertPos + 4);

          tr.setSelection(TextSelection.create(tr.doc, resolvedPos.pos));

          dispatch(tr);

          return true;
        },
    };
  },
});

export default Paragraph;
