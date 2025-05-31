import "./examples.css";

const MyParagraph = () => {
  //  ABC
  //    DEF
  //    * Bullet1
  //      * Bullet2
  //    1. 1

  return (
    <div className="examples_group examples_container">
      <div className="examples_block">
        <div className="examples_body">
          <div className="examples_content" data-type="paragraph">
            <p>ABC</p>
          </div>

          <div className="examples_group">
            <div className="examples_block">
              <div className="examples_body">
                <div className="examples_content" data-type="paragraph">
                  <p>DEF</p>
                </div>
              </div>
            </div>

            <div className="examples_block">
              <div className="examples_body">
                <div
                  className="examples_content"
                  data-type="unordered-listItem"
                >
                  <p>Bullet1</p>
                </div>

                <div className="examples_group">
                  <div className="examples_block">
                    <div className="examples_body">
                      <div
                        className="examples_content"
                        data-type="unordered-listItem"
                      >
                        <p>Bullet2</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="examples_block">
              <div className="examples_body">
                <div className="examples_content" data-type="ordered-listItem">
                  <p>ABC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyParagraph;
