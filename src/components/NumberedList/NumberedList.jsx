import "./NumberedList.css";

const NumberedList = () => {
  return (
    <>
      <div
        className="block-numberedList"
        data-level="0"
        data-start="12"
        data-type="numberedList"
      >
        <div className="content-numberedList">
          <p>Numbered List</p>
        </div>
      </div>

      <div
        className="block-numberedList"
        data-level="0"
        data-start="100"
        data-type="numberedList"
      >
        <div className="content-numberedList">
          <p>Numbered List</p>
        </div>
      </div>

      <div
        className="block-numberedList"
        data-level="0"
        data-start="1"
        data-type="numberedList"
      >
        <div className="content-numberedList">
          <p>Numbered List</p>
        </div>
      </div>
    </>
  );
};

export default NumberedList;
