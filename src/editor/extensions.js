import { UndoRedo } from "@tiptap/extensions";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";

import { Doc, Block, Content, Group, Paragraph } from "../extensions";
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
  Group,
  Paragraph,
  BlockCommands,
];

export default extensions;
