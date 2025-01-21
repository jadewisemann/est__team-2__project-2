

// module
import './hero--slider--slide.js'

class HeroSlider extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
  }

  connectedCallback() {
    this.render()
  }
  
  async getData() {
    try {
      const response = await fetch('/asset/data/tmdb-result.json');
      const { "image-url": imageURL, results } = await response.json();
      return { imageURL, results }
    } catch (error) {
      console.error('Error fetching or generating slides:', error);
      return { imageURL: '', results: [] }
    }
  }

  async generateSlides() {
    const { imageURL, results } = await this.getData();
    
    return results.map(result => /*html*/ `
      <swiper-slide>
        <hero--slider--slide
          poster="${imageURL}${result.poster_path}"
          backdrop="${imageURL}${result.backdrop_path}"
          title="${result.title}"
          plot="${result.overview}"
          imdbID="${result.id}">
        </hero--slider--slide>
      </swiper-slide>
    `).join('');
  }

  async render() {
    const slides = await this.generateSlides();
    
    // add to shadow root
    this.shadowRoot.innerHTML = /*html*/`
      this is hero slider
      <swiper-container 
        class="mySwiper" 
        pagination="true" 
        pagination-clickable="true" 
        navigation="true"
        space-between="30"
        centered-slides="true"
        autoplay-delay="2500"
        autoplay-disable-on-interaction="false"
      >
        ${slides}
      </swiper-container>
    `
    
    
    const style = document.createElement('style')
    style.innerHTML = /*css*/`
    `
    this.shadowRoot.appendChild(style)
  }
}

customElements.define('hero--slider', HeroSlider);
