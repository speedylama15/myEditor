const createBlock = (editor, content) => {
  const { schema } = editor;

  return schema.nodes.block.create(
    {
      class: "block",
      "data-node-type": "block",
    },
    Array.isArray(content) ? [...content] : [content]
  );
};

export default createBlock;
