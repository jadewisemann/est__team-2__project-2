class WebComponent extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <div>hello, World</div>
    `;
  };
}

customElements.define('web-component', WebComponent);