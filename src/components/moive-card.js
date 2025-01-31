//* import, components
import './rating--stars.js'

//* define, custom element
class MovieCard extends HTMLElement {
  //* life-cycle call backs
  constructor() {
    super()
  }
  
  connectedCallback() {
    this.render()
  }

  //* define render function
  render() {    
    //* get attribute 
    const title = this.getAttribute('title') || 'title'
    const poster = this.getAttribute('poster') || 'poster'
    const parseRating = JSON.parse(this.getAttribute('ratings') || '[]')
    const isCardRanked = this.getAttribute('ranked') === 'true' ? true : false
    const rank = this.getAttribute('rank')
    const safeRatings =  parseRating.length
      ? parseRating
      : [{"Source": "N/A", "Value": "N/A"}]
    const { "Source": ratingSource , "Value": ratingScore } = safeRatings[0]


    //* set, html
    //* optional html 
    const notRankedInnerInfoWrapper = /*html*/`
    <div class="movie-card__info-wrapper">
      <div class="movie-card__title">${title}</div>
      <!-- <div class="movie-card__rating">${ratingScore}</div> -->
      <rating-stars score=${ratingScore}></rating-stars>
    </div>
    `
    const rankedInnerInfoWrapper = /*html*/`
    <div class="movie-card__info-wrapper">
      <div class="movie-card__ranked">${rank}</div>
    </div>
    `

    this.innerHTML = /*html*/ `
    <div class="movie-card">
      <div class="movie-card__poster" style="
        background: url(${poster}) no-repeat center center;
        background-size: cover;
      "></div>
      ${isCardRanked
        ? rankedInnerInfoWrapper
        : notRankedInnerInfoWrapper
      }
    </div>
    `

    // css
    const style = document.createElement('style')
    style.innerHTML = /*css*/`
    .movie-card {
      width: 100%;
    } 
    .movie-card__poster {
      width: 100%;
      aspect-ratio: 2/3;
    }
    .movie-card__info-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 5px;
    }
    .movie-card__title {
      color: #A5A5A5;
      -webkit-text-stroke-width: 1;
      -webkit-text-stroke-color: #000;
      font-family: Manrope;
      font-size: 22px;
      font-style: normal;
      font-weight: 700;
      line-height: 150%; /* 33px */
      /* ban linebreak */
      white-space: nowrap;
      overflow: hidden;         
      text-overflow: ellipsis; 
    }

    .movie-card__rating {
      color: #A5A5A5;
      text-align: right;
      -webkit-text-stroke-width: 1;
      -webkit-text-stroke-color: #000;
      font-family: Manrope;
      font-size: 22px;
      font-style: normal;
      font-weight: 700;
      line-height: 150%; /* 33px */
    }
   .movie-card__ranked {
    font-family: roboto;
    font-weight: 800;
    font-style: italic;
    font-size: 180px;
    line-height: normal;
    color: white;
    position: absolute;
    bottom: 143px;
    left: 20px;
    transform: translateY(100%);
    
   } 
    `
    this.appendChild(style)

    // property
  }
}

customElements.define('movie-card', MovieCard);
