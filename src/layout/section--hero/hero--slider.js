import "../../components/btn--paly-now.js"

class HeroSlider extends HTMLElement {
  constructor() {
    super()
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
    // const poster = `${imageURL}${results.poster_path}`
    
    return results.map(result => /*html*/ `
      <swiper-slide >
        <div class="section--hero__slide--container" style="
          background: url(${imageURL}${result.backdrop_path}) no-repeat;
          background-size: cover;
          ">
          <div class="section--hero__slide--inner-wrapper">
            <div class="section--hero__slide--inner__text-wrapper">
              <h2 class="section--hero__slide__title">${result.title}</h2>
              <div class="section--hero__slide__plot">${result.overview}</div>
            </div>
            <btn--play-now imdbID=${result.id}></b--play-now>
          </div>
        </div>
      </swiper-slide>
    `).join('')
  }

  async render() {
    const slides = await this.generateSlides();
    
    this.innerHTML = /*html*/`
      <swiper-container 
        class="mySwiper" 
        pagination="true" 
        pagination-clickable="true" 
        navigation="true"
        space-between="30"
        centered-slides="true"
        autoplay-delay="250000000"
        autoplay-disable-on-interaction="false"
      >
        ${slides}
      </swiper-container>
    `
    
    const style = document.createElement('style')
    style.innerHTML = /*css*/`
      hero--slider {
      }

      swiper-container {
        height: 100vh;
        background-color: yellow;
      }
      swiper-container::part(pagination) {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
      }
  
      swiper-container::part(button-prev),
      swiper-container::part(button-next) {
        position: absolute;
        top: calc(100% - 20px);
        /* border: 12px solid red; */
      }
  
      swiper-container::part(button-prev) {
        left: 20px;
      }
  
      swiper-container::part(button-next) {
        right: 20px;
      }
      

      swiper-slide {
        height: 100%;
      }

      .section--hero__slide--container {
        height: 100%;
       display: flex;
       flex-direction: column;
       /* justify-content: center; */
       justify-content: flex-end;
       align-items: center;
       padding: 50px;
       padding-bottom: 20px;
      }
      .section--hero__slide--inner-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 106px;
      }
      .section--hero__slide--inner__text-wrapper  {
        width: 100%;
        padding: 0 150px;
        margin-bottom: 30px;
      }
      .section--hero__slide__title {
        color: var(--Absolute-White, #FFF);
        text-align: center;
        font-family: Manrope;
        font-size: 80px;
        font-style: normal;
        font-weight: 700;
        line-height: 150%; /* 120px */
      }
      .section--hero__slide__plot {
        color: var(--Grey-60, #999);
        text-align: center;
        font-family: Manrope;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; /* 27px */
      }
    `
    this.appendChild(style)
  }
}

customElements.define('hero--slider', HeroSlider);
