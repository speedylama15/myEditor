import { BulletList } from "@tiptap/extension-list";
import { TextSelection } from "@tiptap/pm/state";
import { Fragment } from "@tiptap/pm/model";

export const CustomBulletList = BulletList.extend({
  addKeyboardShortcuts() {
    return {
      Backspace: ({ editor }) => {
        // return editor.commands.doSomething();
        return editor.commands.doMoreThings();
      },
    };
  },
  addCommands() {
    return {
      doMoreThings:
        () =>
        ({ state, dispatch, tr }) => {
          const { selection } = state;
          const { $from } = selection;

          const paragraph = $from.node($from.depth);
          const listItem = $from.node($from.depth - 1);
          const list = $from.node($from.depth - 2);
          const textContent = paragraph.textContent;
          const index = $from.index($from.depth - 2);

          // FIX
          console.log("DO MORE THINGS", { textContent, list, listItem, index });

          const beforeContent = [];
          const alteredContent = [];
          const afterContent = [];

          for (let i = 0; i < list.content.content.length; i++) {
            const element = list.content.content[i];

            if (i < index) beforeContent.push(element);
            if (i > index) afterContent.push(element);
          }

          // FIX
          console.log({ beforeContent, afterContent });

          return true;
        },
      doSomething:
        () =>
        ({ state, tr, dispatch }) => {
          const { selection } = state;
          const { $from } = selection;
          const { parentOffset } = $from;

          const list = $from.node($from.depth - 2);
          const listItem = $from.node($from.depth - 1);

          // REVIEW: if list does not exist end
          if (
            (list?.type.name !== "bulletList" &&
              list?.type.name !== "orderedList") ||
            listItem?.type.name !== "listItem"
          ) {
            //FIX
            console.log("Do Nothing");

            return false;
          }

          const listPos = $from.before($from.depth - 2);

          if (
            (list?.type.name === "bulletList" ||
              list?.type.name === "orderedList") &&
            listItem?.type.name == "listItem" &&
            parentOffset === 0
          ) {
            // FIX
            console.log("Do Something");

            const content = list.content.content;
            const index = $from.index($from.depth - 2);

            console.log(index);

            const beforeContent = [];
            const afterContent = [];

            for (let i = 0; i < content.length; i++) {
              if (i === index || i > index) break;
              const node = content[i];
              beforeContent.push(node);
            }

            for (let i = 0; i < content.length; i++) {
              if (i > index) {
                const node = content[i];
                afterContent.push(node);
              }
            }

            let caretPosition = listPos;
            const replacement = [];

            if (beforeContent.length > 0) {
              const beforeUl = list.type.create(
                list.attrs,
                Fragment.from(beforeContent)
              );

              caretPosition += beforeUl.nodeSize;

              replacement.push(beforeUl);
            }

            const listItem = content[index];

            const contents = listItem.content.content;

            for (let i = 0; i < contents.length; i++) {
              replacement.push(contents[i]);
            }

            if (afterContent.length > 0) {
              const afterUl = list.type.create(
                list.attrs,
                Fragment.from(afterContent)
              );

              replacement.push(afterUl);
            }

            tr.replaceWith(listPos, listPos + list.nodeSize, replacement);

            const $caretPosition = tr.doc.resolve(caretPosition + 1);

            tr.setSelection(TextSelection.near($caretPosition));

            dispatch(tr);

            return true;
          }

          return false;
        },
    };
  },
});
