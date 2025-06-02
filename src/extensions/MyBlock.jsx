import { Node } from "@tiptap/core";
import { mergeAttributes } from "@tiptap/core";

export const MyDoc = Node.create({
  name: "myDoc",
  topNode: true,
  content: "myBlock+",
});

export const MyBlock = Node.create({
  name: "myBlock",
  group: "block",
  // REVIEW:
  content: "blockContent group?",

  parseHTML() {
    return [{ tag: 'div[data-node-type="block"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-node-type": "block" }),
      0,
    ];
  },
});

export const MyGroup = Node.create({
  name: "myGroup",
  group: "group",
  content: "block+",

  parseHTML() {
    return [{ tag: 'div[data-node-type="group"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-node-type": "group" }),
      0,
    ];
  },
});

// 3. PARAGRAPH NODE - Inner content
export const MyParagraph = Node.create({
  name: "myParagraph",

  group: "blockContent",

  content: "inline*",

  parseHTML() {
    return [{ tag: "p" }, { tag: 'div[data-node-type="paragraph"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-node-type": "paragraph" }),
      0,
    ];
  },
});

// 4. BULLET LIST ITEM NODE
export const CustomBulletListItem = Node.create({
  name: "customBulletListItem",

  group: "blockContent",

  content: "inline*",

  parseHTML() {
    return [{ tag: 'div[data-node-type="bullet-listItem"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-node-type": "bullet-listItem" }),
      0,
    ];
  },
});

// 5. NUMBERED LIST ITEM NODE
export const CustomNumberedListItem = Node.create({
  name: "customNumberedListItem",

  group: "blockContent",

  content: "inline*",

  parseHTML() {
    return [{ tag: 'div[data-node-type="numbered-listItem"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-node-type": "numbered-listItem",
      }),
      0,
    ];
  },
});
