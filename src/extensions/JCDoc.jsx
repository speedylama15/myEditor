import { Node } from "@tiptap/core";

export const JCDoc = Node.create({
  name: "jcDoc",
  topNode: true,
  content: "jcBlock+",
});
