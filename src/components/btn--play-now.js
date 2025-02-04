class BtnPlayNow extends HTMLElement {

  constructor() {
    super()
  }

  connectedCallback() {
    this.render()
  }
  
  render() {   
    const imdbID  = this.getAttribute(`imdbID`) || 'imdbID'

    this.innerHTML = /*html*/`    
      <button class="btn--play-now">
          <a href="movie-details.html?id=${imdbID}" class="btn--play-now__anchor">
              Play Now
          </a> 
      </button>
    `
  }
}

customElements.define('btn--play-now', BtnPlayNow);
