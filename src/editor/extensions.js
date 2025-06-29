import { UndoRedo } from "@tiptap/extensions";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";

import CheckListNV from "../extensions/nodes/CheckList/CheckListNV";

import {
  Doc,
  Block,
  Content,
  Paragraph,
  BulletList,
  Plugins,
} from "../extensions";
// FIX
import Shortcuts from "../shortcuts/Shortcuts";
import Checklist from "../extensions/nodes/CheckList/Checklist";
import ChecklistItem from "../extensions/nodes/CheckList/ChecklistItem";
import { BlockCommands } from "../commands";

const extensions = [
  Text,
  Bold,
  Italic,
  Subscript,
  Superscript,
  Strike,
  Underline,
  Highlight,
  UndoRedo,
  Doc,
  Block,
  Content,
  BulletList,
  Paragraph,
  Plugins,
  Shortcuts,
  BlockCommands,
  // FIX
  CheckListNV,
  Checklist,
  ChecklistItem,
];

export default extensions;
