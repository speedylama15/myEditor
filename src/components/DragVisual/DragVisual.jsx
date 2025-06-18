import "./DragVisual.css";

const DragVisual = () => {
  return (
    <div className="drag-visual_container">
      <div className="drag-visual">
        <div className="drag-visual_content" data-content-type="paragraph">
          <p className="drag-visual_paragraph">Paragraph</p>
        </div>
      </div>

      <div className="drag-visual">
        <div className="drag-visual_content" data-content-type="numbered-list">
          <p className="drag-visual_paragraph">Numbered List</p>
        </div>
      </div>

      <div className="drag-visual">
        <div className="drag-visual_content" data-content-type="bullet-list">
          <p className="drag-visual_paragraph">Bullet List</p>
        </div>
      </div>
    </div>
  );
};

export default DragVisual;
