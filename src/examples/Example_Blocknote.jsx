const Example_Blocknote = () => {
  // * ABC
  // 	* DEF
  // 		1. 123
  // 	1. 456
  // 	Paragraph

  return (
    <div class="bn-block-group" data-node-type="blockGroup">
      {/* IDEA: A */}
      <div
        class="bn-block-outer"
        data-node-type="blockOuter"
        data-id="f94a1ac4-cf7a-453b-9e41-1ceb3c0172bf"
      >
        <div
          class="bn-block"
          data-node-type="blockContainer"
          data-id="f94a1ac4-cf7a-453b-9e41-1ceb3c0172bf"
        >
          <div class="bn-block-content" data-content-type="bulletListItem">
            <p class="bn-inline-content">A</p>
          </div>
          {/* IDEA: A */}

          {/* REVIEW */}
          {/* IDEA: B */}
          <div class="bn-block-group" data-node-type="blockGroup">
            <div
              class="bn-block-outer"
              data-node-type="blockOuter"
              data-id="db25c699-ee0f-44bd-a2f8-dcf04af36f2d"
            >
              <div
                class="bn-block"
                data-node-type="blockContainer"
                data-id="db25c699-ee0f-44bd-a2f8-dcf04af36f2d"
              >
                <div
                  class="bn-block-content"
                  data-content-type="bulletListItem"
                >
                  <p class="bn-inline-content">B</p>
                </div>
                {/* IDEA: B */}

                {/* REVIEW */}
                {/* IDEA: 1 */}
                <div class="bn-block-group" data-node-type="blockGroup">
                  <div
                    class="bn-block-outer"
                    data-node-type="blockOuter"
                    data-id="5d343d07-1e5c-4bb1-be1d-b85cc5898f0c"
                  >
                    <div
                      class="bn-block"
                      data-node-type="blockContainer"
                      data-id="5d343d07-1e5c-4bb1-be1d-b85cc5898f0c"
                    >
                      <div
                        class="bn-block-content"
                        data-content-type="numberedListItem"
                        data-index="1"
                      >
                        <p class="bn-inline-content">1</p>
                      </div>
                      {/* IDEA: 1 */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* IDEA: 2 */}
            <div
              class="bn-block-outer"
              data-node-type="blockOuter"
              data-id="fd8a0a52-4733-4824-a34a-65ae9b6448d6"
            >
              <div
                class="bn-block"
                data-node-type="blockContainer"
                data-id="fd8a0a52-4733-4824-a34a-65ae9b6448d6"
              >
                <div
                  class="bn-block-content"
                  data-content-type="numberedListItem"
                  data-index="1"
                >
                  <p class="bn-inline-content">2</p>
                </div>
              </div>
            </div>
            {/* IDEA: 2 */}

            {/* IDEA: Paragraph */}
            <div
              class="bn-block-outer"
              data-node-type="blockOuter"
              data-id="2c8bdfee-dcb1-4ea8-afbe-635d4bebbdb4"
            >
              <div
                class="bn-block"
                data-node-type="blockContainer"
                data-id="2c8bdfee-dcb1-4ea8-afbe-635d4bebbdb4"
              >
                <div class="bn-block-content" data-content-type="paragraph">
                  <p class="bn-inline-content">Paragraph</p>
                </div>
              </div>
            </div>
            {/* IDEA: Paragraph */}
          </div>
        </div>
      </div>

      {/* TODO: this is separate because it is a sibling to A */}
      <div
        class="bn-block-outer"
        data-node-type="blockOuter"
        data-id="484bb01e-68d4-4749-9d59-90d2ee753c7d"
      >
        <div
          class="bn-block"
          data-node-type="blockContainer"
          data-id="484bb01e-68d4-4749-9d59-90d2ee753c7d"
        >
          <div
            class="bn-block-content"
            data-content-type="numberedListItem"
            data-index="1"
          >
            <p class="bn-inline-content">This is separate</p>
          </div>
        </div>
      </div>

      {/* TODO: this is just a blank paragraph node */}
      <div
        class="bn-block-outer"
        data-node-type="blockOuter"
        data-id="571b9ca4-9b8e-41c4-97f2-2fabbc39ef32"
      >
        <div
          class="bn-block"
          data-node-type="blockContainer"
          data-id="571b9ca4-9b8e-41c4-97f2-2fabbc39ef32"
        >
          <div class="bn-block-content" data-content-type="paragraph">
            <p class="bn-inline-content">
              <br class="ProseMirror-trailingBreak" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Example_Blocknote;
