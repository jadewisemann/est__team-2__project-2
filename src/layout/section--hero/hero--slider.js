// external module
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

// internal module
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
    const linearGradient = "linear-gradient(0deg, #141414 0%, rgba(20, 20, 20, 0.00) 100%)"
    return results.map(result => /*html*/ `
      <div class="swiper-slide" style="
        background: ${linearGradient}, url(${imageURL}${result.backdrop_path}) no-repeat;
        background-size: cover;
        ">
        <div class="swiper-slide--wrapper">
          <div class="swiper-slide--text-wrapper">
            <h2 class="swiper-slide__title">${result.title}</h2>
            <div class="swiper-slide__plot">${result.overview}</div>
          </div>
          <btn--play-now class="swiper__slide__btn" imdbID=${result.id}></btn--play-now>
        </div>
      </div>
    `).join('')
  }
  
  async render() {
    const slides = await this.generateSlides();
    
    this.innerHTML = /*html*/`
      <div class="swiper">
        <div class="swiper-wrapper">
        ${slides}
        </div>

        <div class="swiper-control--wrapper">
          <div class="swiper-button-prev">
            <div class="icon"></div> 
          </div>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-next">
            <div class="icon"></div> 
          </div>
        </div>
      </div>
    `
    
    const style = document.createElement('style')
    style.innerHTML = /*css*/`
    .swiper {
        width: 100%;
        height: 100%;
    }

    .swiper-slide {
      display: flex;
      padding: 50px;
      padding-bottom: 20px;
      align-items: flex-end;
    }

    .swiper-slide--wrapper {
      width: 100%;
      height: 100%;
      margin-bottom: 56px;
      padding: 0 150px;
      padding-bottom: 50px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;  
    }
    
    .swiper-slide--text-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .swiper-slide__title {
      color: var(--Absolute-White, #FFF);
      text-align: center;
      font-family: Manrope;
      font-size: 80px;
      font-style: normal;
      font-weight: 700;
      line-height: 150%; /* 120px */
    }

    .swiper-slide__plot {
      color: var(--Grey-60, #999);
      text-align: center;
      font-family: Manrope;
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: 150%; /* 27px */
      margin-bottom: 30px;
    }

    .swiper-control--wrapper {
        width: 100%;
        height: 56px;
        position: absolute;
        display: flex;
        bottom: 20px;
    }

    .swiper-pagination,
    .swiper-button-prev,
    .swiper-button-next {
        position: relative;
    }

    .swiper-button-prev,
    .swiper-button-next{
      width: 56px;
      height: 56px;
      padding: 14px;
      border-radius: 8px;
      border: 1px solid var(--Black-12, #1F1F1F);
      background: var(--Black-06, #0F0F0F);
      &::after {
        content: none;
      }
    }

    .icon {
      height: 28px;
      width: 28px;
    }

    .swiper-button-prev {
      margin-left: 100px;
      
      .icon {
        background: url("/asset/img/swiper-button-prev.svg");
      }
    }
    
    .swiper-button-next {
      margin-right: 100px;
      
      .icon {
        background: url("/asset/img/swiper-button-next.svg");
      }
    }

    .swiper-pagination {
      margin-top: 28px;
      display: flex;
      justify-content: center;
      gap: 3px;
    }
    span.swiper-pagination-bullet  {
      width: 16px;
      height: 4px;
      border-radius: 100px;
      background: var(--Black-20, #333);
    }

    span.swiper-pagination-bullet-active {
      width: 24px;
      background: #3887FF;
    }`


    this.appendChild(style)    

    // swiper initialize
    new Swiper('.swiper', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}

customElements.define('hero--slider', HeroSlider);
