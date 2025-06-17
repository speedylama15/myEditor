import { Plugin, PluginKey } from "@tiptap/pm/state";

export const blockHierarchyPluginKey = new PluginKey("blockHierarchyPlugin");

const createBlockHierarchy = (doc) => {
  const obj = {};

  doc.descendants((node, pos) => {
    if (node.type.name === "block") {
      const id = node.attrs["data-id"];
      const indentLevel = parseInt(node.attrs["data-indent-level"]);

      if (!obj[indentLevel]) {
        obj[indentLevel] = [{ id, before: pos }];
      } else {
        obj[indentLevel].push({ id, before: pos });
      }
    }
  });

  return obj;
};

// TODO: createLevelObject?
// TODO: how to prevent apply from doing something to much
// TODO: how to use meta for optimizations
// TODO: how to access plugin state?
const blockHierarchyPlugin = new Plugin({
  key: blockHierarchyPluginKey,

  // IDEA: view
  view: () => ({
    update: () => {},
  }),

  // IDEA: state
  state: {
    init(config, state) {
      return { levelMap: createBlockHierarchy(state.doc) };
    },
    // REVIEW: each time a change occurs this gets invoked
    apply(tr, value, oldState) {
      console.log("apply", oldState);
    },
  },
});

export default blockHierarchyPlugin;
