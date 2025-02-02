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
    const isHorizontal = this.getAttribute('horizontal') === 'true' ? true : false
    const imdbID = this.getAttribute('imdb-id') || ""
    // rating
    const isRating = this.getAttribute('is-rating') === 'true' ? true : false
    const parseRating = JSON.parse(this.getAttribute('ratings') || '[]')
    const safeRatings =  parseRating.length
      ? parseRating
      : [{"Source": "N/A", "Value": "N/A"}]
    const { "Source": ratingSource , "Value": ratingScore } = safeRatings[0]
    // rank
    const isCardRanked = this.getAttribute('ranked') === 'true' ? true : false
    const rank = this.getAttribute('rank')

    //* set, html
    //* optional html  => info wrapper 
    const notRankedInnerInfoWrapper = /*html*/`
      <div class="movie-card__info-wrapper">
        <div class="movie-card__title">${title}</div>
        <!-- <div class="movie-card__rating">${ratingScore}</div> -->
        ${isRating || !isHorizontal /*html*/
          ? `<rating-stars score=${ratingScore}></rating-stars>`
          : ""
        }
      </div>
    `

    const rankedInnerInfoWrapper = /*html*/`
      <div class="movie-card__info-wrapper">
        <div class="movie-card__ranked">${rank}</div>
      </div>
    `

    //* optional html  =>  card poster 
    const horizontalPoster = /*html*/`
      <div class="movie-card__poster movie-card__poster--horizontal" style="
      background: url(${poster}) no-repeat center center;
      background-size: cover;
      "></div>
    `
    //* vertical 
    const verticalPoster = /*html*/`
      <div class="movie-card__poster movie-card__poster--vertical" style="
        background: url(${poster}) no-repeat center center;
        background-size: cover;
      "></div>
    `

    this.innerHTML = /*html*/`
      <div class="movie-card">
        ${ isHorizontal 
          ? horizontalPoster
          : verticalPoster
        }
        ${ isCardRanked
          ? rankedInnerInfoWrapper
          : notRankedInnerInfoWrapper
        }
      </div>
    ` 

    //* js
    this.querySelector('.movie-card__poster').addEventListener('click', () => {
      window.location.href = `movie-detail.html?id=${imdbID}`;
    })

    //* css
    const style = document.createElement('style')
    style.innerHTML = /*css*/`
    .movie-card {
      width: 100%;
    }
    .movie-card__poster {
      cursor: pointer;
    } 
    .movie-card__poster--vertical {
      width: 100%;
      aspect-ratio: 2/3;
    }
    .movie-card__poster--horizontal {
      width: 100%;
      aspect-ratio: 3/2;
      border-radius: 10px;
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
