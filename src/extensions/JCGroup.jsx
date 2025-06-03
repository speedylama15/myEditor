import { Node } from "@tiptap/core";
import { mergeAttributes } from "@tiptap/core";

export const JCGroup = Node.create({
  name: "jcGroup",
  group: "jcGroup",
  // REVIEW: we'll have to see how this holds up to
  content: "jcBlock+",

  parseHTML() {
    return [{ tag: 'div[data-node-type="jc-group"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        class: "jc-group",
        "data-node-type": "jc-group",
        // IDEA: this needs adjustment
        "data-indent-level": 1,
      }),
      0,
    ];
  },
});
