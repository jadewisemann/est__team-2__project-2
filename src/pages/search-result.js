
import "/src/components/movie-card.js"

import { getSearchResult } from "/src/utils/fetch.js"

const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get('title');

const searchResult = document.querySelector('.search-result');

(async (title) => {
  const movieDetail = await getSearchResult(title);
  Object.values(movieDetail).forEach(movie => {
    const movieCardElement = document.createElement('movie-card');
    movieCardElement.setAttribute('title', movie.Title);
    movieCardElement.setAttribute('year', movie.Year);
    movieCardElement.setAttribute('imdb-id', movie.ImdbID);
    movieCardElement.setAttribute('type', movie.Type);
    movieCardElement.setAttribute('poster', movie.Poster);
    searchResult.appendChild(movieCardElement);
  })
})(title)


