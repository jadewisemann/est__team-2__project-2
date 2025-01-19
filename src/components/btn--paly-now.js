class BtnPlayNow extends HTMLElement {

  constructor() {
    super()
    this.attachShadow({mode: 'open'})
  }

  connectedCallback() {
    this.render()
  }
  
  render() {  
    
    const imdbID  = this.getAttribute(`imdbID`) || 'imdbID'

    console.log(imdbID)

    this.shadowRoot.innerHTML = /*html*/`    
      <button class="btn--play-now__button">
          <a href="movie-detail.html?i=${imdbID}" class="btn--play-now__button__anchor">
              Play Now
          </a> 
      </button>
    `
    const style = document.createElement('style')

    style.innerHTML = //css
    `
    a {

    }
    `

    this.shadowRoot.appendChild(style)

  }
}

customElements.define('btn--play-now', BtnPlayNow);
