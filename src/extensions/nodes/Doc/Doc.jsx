import { Node } from "@tiptap/core";

const Doc = Node.create({
  name: "doc",
  topNode: true,
  content: "block+ checklistNv?+",
});

export default Doc;
