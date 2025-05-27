import Paragraph from "@tiptap/extension-paragraph";

export const CustomParagraph = Paragraph.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      color: {
        default: "null",
        parseHTML: (element) => {
          // FIX
          // console.log("parseHTML", element);

          return element.getAttribute("data-color");
        },
        renderHTML: (attributes) => {
          // FIX
          // console.log("renderHTML", attributes);

          return { style: `color: ${attributes.color}` };
        },
      },
    };
  },
  addKeyboardShortcuts() {
    return {
      Tab: ({ editor }) => {
        const { head, anchor, from, to } = editor.state.selection;

        // FIX
        // TODO: you can access "this" object
        // console.log({
        //   head,
        //   anchor,
        //   from,
        //   to,
        //   selection: editor.state.selection,
        // });

        // TODO: return true to end the process
        // TODO: return false to let other handlers process this key
        return false;
      },
    };
  },
});
