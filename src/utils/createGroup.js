const createGroup = (editor, indentLevel, content) => {
  const { schema } = editor;

  return schema.nodes.group.create(
    {
      class: "group",
      "data-node-type": "group",
      "data-indent-level": indentLevel.toString(),
    },
    Array.isArray(content) ? [...content] : [content]
  );
};

export default createGroup;
