import Paragraph from "@tiptap/extension-paragraph";

export const MyParagraph = Paragraph.extend({
  parseHTML() {
    return [
      {
        tag: "p",
        getAttrs: (element) => {
          // console.log({
          //   element,
          //   hasDataIndent: element.hasAttribute("data-indent"),
          //   dataIndent: element.getAttribute("data-indent"),
          // });

          return null;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    // console.log("Node renderHTML", HTMLAttributes);

    return ["p", HTMLAttributes, 0];
  },

  addAttributes() {
    return {
      "data-indent": {
        default: "0",
        parseHTML: (element) => {
          // console.log("Add attributes parseHTML");

          return element.getAttribute("data-indent");
        },
        renderHTML: (attributes) => {
          // console.log("Add attributes renderHTML", attributes);

          return { "data-indent": `${attributes["data-indent"]}` };
        },
      },
    };
  },
});
