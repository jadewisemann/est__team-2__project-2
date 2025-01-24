// components
import './rating--stars.js'
// define custom element
class MovieCard extends HTMLElement {
  constructor() {
    super()
  }
  
  connectedCallback() {
    this.render()
  }

  render() {    
    // attribute
    const title = this.getAttribute('title') || 'title';    
    const poster = this.getAttribute('poster') || 'poster';    
    const parseRating = JSON.parse(this.getAttribute('ratings') || '[]')
    const safeRatings =  parseRating.length
      ? parseRating
      : [{"Source": "N/A", "Value": "N/A"}]
    const { "Source": ratingSource , "Value": ratingScore } = safeRatings[0]
    
    // html
    this.innerHTML = /*html*/ `
    <div class="movie-card">
      <div class="movie-card__poster" style="
        background: url(${poster}) no-repeat;
        background-size: cover;
      ">
      </div>
      <div class="movie-card__info-wrapper">
          <div class="movie-card__title">${title}</div>
          <div class="movie-card__rating">
            ${ratingScore}
          </div>
          <rating-stars score=${ratingScore}>
          </rating-stars>
      </div>
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
    }`
    this.appendChild(style)

    // property
  }
}

customElements.define('movie-card', MovieCard);
