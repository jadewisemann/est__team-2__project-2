//* import, components
import './rating-stars.js'

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
    // attribute
    //> get attribute
    const title = this.getAttribute('title') || 'title'
    const poster = this.getAttribute('poster') || 'poster'
    const isHorizontal = this.getAttribute('horizontal') === 'true' ? true : false
    const imdbID = this.getAttribute('imdb-id') || ""
    
    // attribute > rating
    const isRating = this.getAttribute('is-rating') === 'true' ? true : false
    const parseRating = JSON.parse(this.getAttribute('ratings') || '[]')
    const safeRatings =  parseRating.length
      ? parseRating
      : [{"Source": "N/A", "Value": "N/A"}]
    const { "Source": ratingSource , "Value": ratingScore } = safeRatings[0]
    
    // attribute > rating
    const isCardRanked = this.getAttribute('ranked') === 'true' ? true : false
    const rank = this.getAttribute('rank')

    // html
    //> poster
    const horizontalPoster = /*html*/`
      <div class="movie-card__poster movie-card__poster--horizontal" style="
      background: url(${poster}) no-repeat center center;
      background-size: cover;
      "></div>
    `

    const verticalPoster = /*html*/`
      <div class="movie-card__poster movie-card__poster--vertical" style="
        background: url(${poster}) no-repeat center center;
        background-size: cover;
      "></div>
    `
    
    const posterWrapper = /*html*/`
      <div class="movie-card__poster-wrapper">
        ${ isHorizontal ? horizontalPoster : verticalPoster }
        <div class="movie-card__heart">&#x2661;</div>
      </div>
    `

    // html > info wrapper 
    const notRankedInnerInfoWrapper = /*html*/`
      <div class="movie-card__info-wrapper">
        <div class="movie-card__title">${title}</div>
        <!-- <div class="movie-card__rating">${ratingScore}</div> -->
        ${isRating || !isHorizontal /*html*/
          ? `<rating-stars rating-score='${ratingScore}' rating-source='${ratingSource}'  ratings='${JSON.stringify(safeRatings)}'></rating-stars>`
          : ""
        }
      </div>
    `

    const rankedInnerInfoWrapper = /*html*/`
      <div class="movie-card__info-wrapper">
        <div class="movie-card__ranked">${rank}</div>
      </div>
    `

    // set, html
    this.innerHTML = /*html*/`
      <div class="movie-card">
        ${posterWrapper}
        ${ isCardRanked
          ? rankedInnerInfoWrapper
          : notRankedInnerInfoWrapper
        }
      </div>
    ` 

    //* add poster click event listener
    this.querySelector('.movie-card__poster').addEventListener('click', () => {
      window.location.href = `movie-details.html?id=${imdbID}`;
    })

    //* feater: heart
    const heartIcon = this.querySelector('.movie-card__heart')
    let liked = false

    heartIcon.addEventListener('click', event => {
      event.stopPropagation() 
      liked = !liked

      heartIcon.innerHTML = liked ? '&#x2665;' : '&#x2661;'
      heartIcon.style.color = liked ? 'red' : 'white'
      heartIcon.classList.toggle('liked', liked)
      updateLikeInDB(liked)
    })

    //* indexedDB
    const updateLikeInDB = likedState => {
      const openRequest = window.indexedDB.open('movieDB', 1)

      openRequest.onupgradeneeded = event => {
        const db = event.target.result
        if (!db.objectStoreNames.contains('likedMovies')) {
          db.createObjectStore('likedMovies', { keyPath: 'imdbID' })
        }
      }
      openRequest.onsuccess = event => {
        const db = event.target.result
        const transaction = db.transaction('likedMovies', 'readwrite')
        const store = transaction.objectStore('likedMovies')
        const movie = { imdbID, title, poster, ratings: safeRatings }
        
        if (likedState) {
          store.put(movie)
        } else {
          store.delete(imdbID)
        }
        transaction.oncomplete = () => db.close()
      }
      openRequest.onerror = (event) => {
        console.error("opening indexedDB failed", event)
      }
    }
    // property
  }
}

customElements.define('movie-card', MovieCard);
