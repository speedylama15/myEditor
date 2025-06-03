export const content = `
  <p>Hey</p>

  <div class="jc-block" data-node-type="jc-block">
    <div
      class="jc-content"
      data-node-type="jc-content"
      data-content-type="jc-paragraph"
    >
      <p class="jc-inline-content">Basic Paragraph Block</p>
    </div>

    <div class="jc-group" data-node-type="jc-group" data-indent-level="1">
      <div class="jc-block" data-node-type="jc-block">
        <div
          class="jc-content"
          data-node-type="jc-content"
          data-content-type="jc-paragraph"
        >
          <p class="jc-inline-content">Basic Paragraph Block 1 1</p>
        </div>

        <div class="jc-group" data-node-type="jc-group" data-indent-level="2">
          <div class="jc-block" data-node-type="jc-block">
            <div
              class="jc-content"
              data-node-type="jc-content"
              data-content-type="jc-list-item"
            >
              <p class="jc-inline-content">Basic Paragraph Block 2 1</p>
            </div>
          </div>
        </div>
      </div>

      <div class="jc-block" data-node-type="jc-block">
        <div
          class="jc-content"
          data-node-type="jc-content"
          data-content-type="jc-paragraph"
        >
          <p class="jc-inline-content">Basic Paragraph Block 1 2</p>
        </div>
      </div>
    </div>
  </div>
`;
