const content = `
<div>
  <div class="block" data-node-type="block">
    <div data-content-type="paragraph" class="content" data-node-type="content">
      <p class="inline-content">a</p>
    </div>

    <div data-indent-level="1" class="group" data-node-type="group">
      <div class="block" data-node-type="block">
        <div
          data-content-type="paragraph"
          class="content"
          data-node-type="content"
        >
          <p class="inline-content">b</p>
        </div>

        <div data-indent-level="2" class="group" data-node-type="group">
          <div class="block" data-node-type="block">
            <div
              data-content-type="paragraph"
              class="content"
              data-node-type="content"
            >
              <p class="inline-content">1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="block" data-node-type="block">
    <div data-content-type="paragraph" class="content" data-node-type="content">
      <p class="inline-content">c</p>
    </div>

    <div data-indent-level="1" class="group" data-node-type="group">
      <div class="block" data-node-type="block">
        <div
          data-content-type="paragraph"
          class="content"
          data-node-type="content"
        >
          <p class="inline-content">d</p>
        </div>
      </div>

      <div class="block" data-node-type="block">
        <div
          data-content-type="paragraph"
          class="content"
          data-node-type="content"
        >
          <p class="inline-content">e</p>
        </div>

        <div data-indent-level="2" class="group" data-node-type="group">
          <div class="block" data-node-type="block">
            <div
              data-content-type="paragraph"
              class="content"
              data-node-type="content"
            >
              <p class="inline-content">f</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="block" data-node-type="block">
    <div data-content-type="paragraph" class="content" data-node-type="content">
      <p class="inline-content">g</p>
    </div>
  </div>
</div>
`;

export default content;

{
  /* <div>
  <div class="block" data-node-type="block">
    <div data-content-type="paragraph" class="content" data-node-type="content">
      <p class="inline-content">a</p>
    </div>

    <div data-indent-level="1" class="group" data-node-type="group">
      <div class="block" data-node-type="block">
        <div
          data-content-type="paragraph"
          class="content"
          data-node-type="content"
        >
          <p class="inline-content">b</p>
        </div>

        <div data-indent-level="2" class="group" data-node-type="group">
          <div class="block" data-node-type="block">
            <div
              data-content-type="paragraph"
              class="content"
              data-node-type="content"
            >
              <p class="inline-content">1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="block" data-node-type="block">
    <div data-content-type="paragraph" class="content" data-node-type="content">
      <p class="inline-content">c</p>
    </div>

    <div data-indent-level="1" class="group" data-node-type="group">
      <div class="block" data-node-type="block">
        <div
          data-content-type="paragraph"
          class="content"
          data-node-type="content"
        >
          <p class="inline-content">d</p>
        </div>
      </div>

      <div class="block" data-node-type="block">
        <div
          data-content-type="paragraph"
          class="content"
          data-node-type="content"
        >
          <p class="inline-content">e</p>
        </div>

        <div data-indent-level="2" class="group" data-node-type="group">
          <div class="block" data-node-type="block">
            <div
              data-content-type="paragraph"
              class="content"
              data-node-type="content"
            >
              <p class="inline-content">f</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="block" data-node-type="block">
    <div data-content-type="paragraph" class="content" data-node-type="content">
      <p class="inline-content">g</p>
    </div>
  </div>
</div> */
}
