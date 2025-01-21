import '../../components/btn--paly-now.js'

class HeroSliderSlide extends HTMLElement {

  constructor() {
    super()
    this.attachShadow({mode: 'open'})
  }

  connectedCallback() {
    this.render()
  }
  
  render() {  
    
    const poster = this.getAttribute(`poster`) || 'poster'
    const backdrop = this.getAttribute(`backdrop`) || 'backdrop'
    const title  = this.getAttribute(`title`) || 'title'
    const plot  = this.getAttribute(`plot`) || 'plot'
    const imdbID  = this.getAttribute(`imdbID`) || 'imdbID'
    
    this.shadowRoot.innerHTML = /*html*/`
        this is hero slider slide
      <div class="section--hero--container">
        <h2 class="sectoin--hero--title">${title}</h2>
        <div class="section--hero--plot">${plot}</div>
        <btn--play-now imdbID=${imdbID}></b--play-now>
      </div>
    `
    
    const style = document.createElement('style')
    style.innerHTML = /*css*/`
      .section--hero--container {
        width: 1000px!important;
        border: 1px solid black;
        aspect-ratio: 2/1;
        background: url(${backdrop}) no-repeat;
        background-size: cover;
        width: 100%;
      }
    `
    this.shadowRoot.appendChild(style)
  }
}

customElements.define('hero--slider--slide', HeroSliderSlide);
