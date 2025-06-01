import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

export const ReactComponent = (props) => {
  console.log("PROPS", props);

  const increase = () => {
    props.updateAttributes({
      count: props.node.attrs.count + 1,
    });
  };

  return (
    <NodeViewWrapper className="react-component">
      <label>React Component</label>

      <div className="content">
        <button onClick={increase}>
          This button has been clicked {props.node.attrs.count} times.
        </button>

        <NodeViewContent className="content" />
      </div>
    </NodeViewWrapper>
  );
};
