class BtnTop extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = /*html*/ `    
     <button class="btn-top" onclick="window.scrollTo(0,0);">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="40" cy="40" r="40" fill="#3887FF"/>
                    <path d="M38.268 28C39.0378 26.6667 40.9623 26.6667 41.7321 28L51.2583 44.5C52.0281 45.8333 51.0659 47.5 49.5263 47.5H30.4737C28.9341 47.5 27.9719 45.8333 28.7417 44.5L38.268 28Z" fill="white"/>
                </svg>
     </button>
      `;
  }
}

customElements.define("btn-top", BtnTop);
