const createParagraph = (editor, content) => {
  const { schema } = editor;

  return schema.nodes.paragraph.create({ class: "paragraph" }, content);
};

export default createParagraph;
