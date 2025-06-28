import {
  NodeViewWrapper,
  NodeViewContent,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import { Node, mergeAttributes } from "@tiptap/core";

const ChecklistComponent = ({ node, updateAttributes }) => {
  return (
    <NodeViewWrapper className="checklist-item">
      <input
        type="checkbox"
        onChange={(e) => updateAttributes({ checked: e.target.checked })}
        checked={node.attrs.checked || false}
      />
      <NodeViewContent className="checklist-content" as="p" />
    </NodeViewWrapper>
  );
};

const CheckListNV = Node.create({
  name: "checklistNv",
  content: "inline*",

  addAttributes() {
    return {
      checked: {
        default: false,
        parseHTML: (element) => element.getAttribute("data-checked") === "true",
        renderHTML: (attributes) => {
          return { "data-checked": attributes.checked };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div.checklist-item",
        getAttrs: (node) => ({
          checked: node.getAttribute("data-checked") === "true",
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        class: "checklist-item",
        "data-checked": node.attrs.checked,
      }),
      [
        "input",
        {
          type: "checkbox",
          checked: node.attrs.checked,
          disabled: true, // For HTML export
        },
      ],
      ["p", { class: "checklist-content" }, 0],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ChecklistComponent);
  },
});

export default CheckListNV;
