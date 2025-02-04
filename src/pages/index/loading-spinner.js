class LoadingSpinner extends HTMLElement { 
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .loader {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(28, 28, 28, 0.9); 
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
      </style>
      <div class="loader">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#3681F3" stroke="#3681F3" stroke-width="15" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#3681F3" stroke="#3681F3" stroke-width="15" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#3681F3" stroke="#3681F3" stroke-width="15" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
      </div>
    `;
  }

  connectedCallback() {
    const duration = this.getAttribute('duration') || 1000

    window.onload = () => {
      setTimeout(() => {
        this.style.display = 'none'
      }, duration);
    }
  }
}

customElements.define('loading-spinner', LoadingSpinner);
