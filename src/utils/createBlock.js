const createBlock = (editor, content, attributes) => {
  const { schema } = editor;

  return schema.nodes.block.create(
    {
      class: "block",
      "data-node-type": "block",
      ...attributes,
    },
    Array.isArray(content) ? [...content] : [content]
  );
};

export default createBlock;
