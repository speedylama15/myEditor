import "./BulletList.css";

const BulletList = () => {
  return (
    <>
      <div className="block-bulletList" data-level="0">
        <div className="content-bulletList">
          <p>Bullet List</p>
        </div>
      </div>

      <div className="block-bulletList" data-level="1">
        <div className="content-bulletList">
          <p>Bullet List</p>
        </div>
      </div>

      <div className="block-bulletList" data-level="2">
        <div className="content-bulletList">
          <p>Bullet List</p>
        </div>
      </div>
    </>
  );
};

export default BulletList;
