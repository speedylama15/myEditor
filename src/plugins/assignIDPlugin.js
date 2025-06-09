import { Plugin, PluginKey } from "@tiptap/pm/state";
import { v4 as uuidv4 } from "uuid";

const assignIDPlugin = new Plugin({
  key: new PluginKey("assignIDPlugin"),
  view: () => ({
    update: (view) => {
      const { state } = view;
      const { tr } = state;
      let modified = false;

      state.doc.descendants((node, pos) => {
        if (node.type.name === "block" && !node.attrs["data-id"]) {
          tr.setNodeMarkup(pos, undefined, {
            ...node.attrs,
            "data-id": uuidv4(),
          });

          modified = true;
        }
      });

      if (modified) {
        view.dispatch(tr);
      }
    },
  }),
});

export default assignIDPlugin;
