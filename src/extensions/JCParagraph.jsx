import { Node } from "@tiptap/core";
import { TextSelection } from "@tiptap/pm/state";

export const JCParagraph = Node.create({
  name: "jcParagraph",
  group: "block",
  // REVIEW: this can change to block and inlines in the future
  content: "inline*",
  marks: "bold",

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
    };
  },

  addCommands() {
    return {
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

          // FIX
          console.log("Selection Info in Content_Paragraph", {
            // selection,
            // $from,
            // currentDepth,
            // currentNode,
            // marks: $from.marks(),
            beforeContent,
            afterContent,
            currentStart,
            currentEnd,
            insertPos,
            block,
          });

          const resolvedPos = tr.doc.resolve(insertPos + 4);

          tr.setSelection(TextSelection.create(tr.doc, resolvedPos.pos));

          dispatch(tr);

          return true;
        },
    };
  },
});
