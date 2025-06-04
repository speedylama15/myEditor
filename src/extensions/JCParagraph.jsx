import { Node } from "@tiptap/core";
import { TextSelection } from "@tiptap/pm/state";

export const JCParagraph = Node.create({
  name: "jcParagraph",
  group: "block",
  // REVIEW: this can change to block and inlines in the future
  content: "inline*",
  marks: "bold italic underline",

  parseHTML() {
    return [{ tag: "p" }, { tag: 'div[data-content-type="paragraph"]' }];
  },

  renderHTML() {
    return ["p", { class: "jc-inline-content" }, 0];
  },

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        return editor.commands.splitParagraphBlock();
      },
      Backspace: ({ editor }) => {
        return editor.commands.mergeWithPreviousBlock();
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

          const prevBlockBeforePos = pos - nodeBefore.nodeSize;
          const prevBlockAfterPos = pos;

          let replaceStartPos;
          const replaceEndPos = pos - 3;
          let newContent;

          nodeBefore.descendants((node) => {
            if (node.type.name === "jcParagraph") {
              // IDEA: kinda important
              replaceStartPos = replaceEndPos - node.content.size;

              newContent = node.content.append(currentParagraphContent);
            }
          });

          // FIX
          console.log({
            resolvedPos,
            currentParagraphNode,
            currentParagraphContent,
            currentBlockData: {
              currentBlockNodeAfterPos,
              currentBlockNodeBeforePos,
            },
            prevBlockData: {
              pos,
              nodeBefore,
              prevBlockBeforePos,
              prevBlockAfterPos,
            },
            replaceData: { replaceStartPos, replaceEndPos, newContent },
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
