import { Node, wrappingInputRule } from "@tiptap/core";

const BulletList = Node.create({
  name: "bulletList",
  group: "bulletList",
  content: "inline*",
  marks: "bold italic underline",

  parseHTML() {
    return [{ tag: "li" }];
  },

  renderHTML() {
    return ["li", { class: "inline-content" }, 0];
  },
});

export default BulletList;
