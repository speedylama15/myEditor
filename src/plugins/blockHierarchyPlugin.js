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

      return false;
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
    // REVIEW: even if it does nothing, you still need to return a state
    apply(tr, value, oldState, newState) {
      // FIX: I need to find a way to make this calculation only when it's necessary
      // tr.docChanged
      return { levelMap: createBlockHierarchy(newState.doc) };
    },
  },
});

export default blockHierarchyPlugin;
