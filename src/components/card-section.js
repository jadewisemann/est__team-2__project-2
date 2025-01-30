// ************************
// import
// ************************

// * util
import { getMovieDetail } from "../utils/fetch.js" 
import Swiper from '../utils/swiper-utils.js'

// * components
import './moive-card.js'

// ************************
// define custom components
// ************************

class CardSection extends HTMLElement {
  //* life call back functions
  constructor() {
    super()
    this._cardIDs = []
  }
  
  connectedCallback() {
    // this.render()
  }


  //* properties => setter & getter
  set cardIDs(value) {
    this._cardIDs = value
    this.render()
  }
  
  get cardsIDs() {
    return this._cardIDs
  }

  //* main render function
  async render() {
    //* make uniqueID, for swiper
    const uniqueId = Math.random().toString(36).substring(2, 9);

    //* getAttribute
    const sectionTitle = this.getAttribute('title') || 'Section Title';    
    const isSectionRanked = Boolean(this.getAttribute('ranked')) || false;
    
    //* set html
    this.innerHTML = /*html*/`
    <div class="card-section">
      <h2 class="card-section__title">${sectionTitle}</h2>
      <div class="swiper swiper-${uniqueId} card-section__card-list">
        <div class="swiper-wrapper">
          <!-- insert slide here -->
        </div>
        <div class="swiper-button-prev swiper-button-prev-${uniqueId}">
          <div class="icon icon-${uniqueId}"></div>
        </div> 
        <div class="swiper-button-next swiper-button-next-${uniqueId}">
          <div class="icon icon-${uniqueId}"></div>
        </div> 
      </div>
    </div>
    `
    //* fetch data, from api, using imdb id
    let cardMovieDetails = []
    try {
      cardMovieDetails = await Promise.all(
        this._cardIDs.map(async cardID => await getMovieDetail(cardID))
      )
    } catch (error) {
      console.error(error)
    }
    
    //* render, from data fetch from above
    this.querySelector('.swiper-wrapper')
      .innerHTML = cardMovieDetails.map((detail, index) => /*html*/`
        <movie-card
          title= "${detail.Title}"  
          poster= "${detail.Poster}"  
          ratings= '${JSON.stringify(detail.Ratings)}'
          ranked= "${isSectionRanked}"
          ${isSectionRanked ? `rank="${index+1}"` :""}
          class= "swiper-slide swiper-slide-${uniqueId}"
        ></movie-card>
      `).join('')

    //* swipper initialize
    new Swiper(`.swiper-${uniqueId}`, {
      slidesPerView: 5,
      spaceBetween: 20,
      loop: false,
      navigation: {
        nextEl: `.swiper-button-next-${uniqueId}`,
        prevEl: `.swiper-button-prev-${uniqueId}`,
      },
    });

    //* set css
    const style = document.createElement('style')
    style.innerHTML = /*css*/`
    ${isSectionRanked 
      ? `
      .swiper-slide-${uniqueId} {
        margin-bottom: 80px;
      }`
      : ""
    }
    .card-section {
      width: 83vw;
      margin: 0 auto 100px;
    }

    .card-section__title {
      color: var(--Absolute-White, #FFF);
      font-family: Manrope;
      font-size: 30px;
      font-style: normal;
      font-weight: 700;
      line-height: 150%; /* 45px */
      margin: 25px 0;
    }

    .swiper-slide {
      padding: 0;
    }

    /* button */
    .swiper-button-prev-${uniqueId},
    .swiper-button-next-${uniqueId} {
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
  
    .icon-${uniqueId} {
      height: 28px;
      width: 28px;
    }
  
    .swiper-button-prev-${uniqueId} .icon {
      background: url("/asset/img/swiper-button-prev.svg");
    }
      
    .swiper-button-next-${uniqueId} .icon {
      background: url("/asset/img/swiper-button-next.svg");
    } 
    `
    this.appendChild(style)
  }
}

customElements.define('card-section', CardSection);
