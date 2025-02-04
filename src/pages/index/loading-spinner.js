const loadingAnimation = /*html*/`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="#3887FF" stroke="#3887FF" stroke-width="8" width="30" height="30" x="25" y="85"><animate attributeName="opacity" calcMode="spline" dur="3" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></rect><rect fill="#3887FF" stroke="#3887FF" stroke-width="8" width="30" height="30" x="85" y="85"><animate attributeName="opacity" calcMode="spline" dur="3" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></rect><rect fill="#3887FF" stroke="#3887FF" stroke-width="8" width="30" height="30" x="145" y="85"><animate attributeName="opacity" calcMode="spline" dur="3" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></rect></svg>
`

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
        .loader-wrapper {
          width: 130px
        }
      </style>

      <div class="loader">
        <div class="loader-wrapper">
          ${loadingAnimation}
        </div>
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
