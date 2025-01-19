

// module
import './hero--slider--slide.js'

// utils
// import '/src/utils/fetch.js' 
import { getMovieDetailHiRes } from '../../utils/fetch.js'

// data
import { heroSectionMovies } from '/asset/data/index.js';

class HeroSlider extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
  }

  connectedCallback() {
    this.render()
  }
  

  async render() {

    const movieDetails = await Promise.all(heroSectionMovies.map(movieID => getMovieDetailHiRes(movieID)));
    
    const slides = movieDetails.map(data => {
      return (/*html*/`
        <swiper-slide>
          <hero--slider--slide
            poster="${data.Poster}"
            title="${data.Title}"
            plot="${data.Plot}"
            imdbID="${data.imdbID}"
          />
        </swiper-slide>
      `);
    }).join('');

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
