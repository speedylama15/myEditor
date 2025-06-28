import { Node, InputRule, mergeAttributes } from "@tiptap/core";

const bulletListInputRule = new InputRule({
  find: /^\s*([-+*])\s$/,
  handler: ({ state, range }) => {
    const { tr } = state;
    const { from } = range;
    const $from = state.doc.resolve(from);

    const cPos = $from.before($from.depth - 1);

    tr.setNodeAttribute(cPos, "data-content-type", "bulletList");
    tr.setNodeAttribute(cPos, "class", "2");
    tr.deleteRange(cPos + 2, cPos + 3);

    return tr;
  },
});

const Block = Node.create({
  name: "block",
  group: "block",
  content: "content{1}",

  addAttributes() {
    return {
      "data-id": {
        default: null,
        parseHTML: (element) => element.getAttribute("data-id"),
        renderHTML: (attributes) => ({
          "data-id": attributes["data-id"],
        }),
      },
      "data-indent-level": {
        default: 0,
        parseHTML: (element) => element.getAttribute("data-indent-level"),
        renderHTML: (attributes) => ({
          "data-indent-level": attributes["data-indent-level"],
        }),
      },
    };
  },

  // FIX: I also have to add in paste rules when a list gets copied and it displays content type to be paragraph instead of bulletList
  addInputRules() {
    return [bulletListInputRule];
  },

  parseHTML() {
    return [{ tag: 'div[data-node-type="block"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        class: "block",
        "data-node-type": "block",
      }),
      0,
    ];
  },
});

export default Block;
