const createContent = (editor, contentType, content, attributes) => {
  const { schema } = editor;

  return schema.nodes.content.create(
    {
      class: "content",
      "data-node-type": "content",
      "data-content-type": contentType,
      ...attributes,
    },
    Array.isArray(content) ? [...content] : [content]
  );
};

export default createContent;
