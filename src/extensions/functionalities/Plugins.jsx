import { Node } from "@tiptap/core";

import { assignIDPlugin, blockHierarchyPlugin } from "../../plugins";

const Plugins = Node.create({
  name: "plugins",

  addProseMirrorPlugins() {
    return [assignIDPlugin, blockHierarchyPlugin];
  },
});

export default Plugins;
