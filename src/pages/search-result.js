import '../components/movie-card.js';

document.addEventListener("DOMContentLoaded", () => {
  initMovieLoader();
});



const loadingAnimation = /*html*/`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="#3887FF" stroke="#3887FF" stroke-width="8" width="30" height="30" x="25" y="85"><animate attributeName="opacity" calcMode="spline" dur="3" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></rect><rect fill="#3887FF" stroke="#3887FF" stroke-width="8" width="30" height="30" x="85" y="85"><animate attributeName="opacity" calcMode="spline" dur="3" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></rect><rect fill="#3887FF" stroke="#3887FF" stroke-width="8" width="30" height="30" x="145" y="85"><animate attributeName="opacity" calcMode="spline" dur="3" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></rect></svg>
`

const loadMore = document.querySelector('.load-more');

let currentPage = 1;
let searchTerm = '';
let genreId = '';
let currentMovies = [];

const TMDB_API_KEY = "d5e4a2eb5fb264de1583b6945d203546";
const OMDB_API_URL = "http://www.omdbapi.com/?apikey=33c97183";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
};

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const showLoading = (container) => {
  if (document.getElementById("loading-indicator")) return;
  
  const loadingEl = document.createElement("div");
  loadingEl.id = "loading-indicator";
  loadingEl.innerHTML = `<p>${loadingAnimation}</p>`
  container.appendChild(loadingEl);
}

const hideLoading = () => {
  const loadingEl = document.getElementById("loading-indicator");
  if (loadingEl) loadingEl.remove();
};

function initMovieLoader() {
  const movieContainer = document.querySelector(".search-result");
  const textSearch = document.querySelector(".text--search");

  searchTerm = getQueryParam("title");
  genreId = getQueryParam("genre");

  currentPage = 1;

  if (searchTerm) {
    movieContainer.innerHTML = "";
    showLoading(textSearch);
    getMoviesInfo(searchTerm, "", currentPage, movieContainer, textSearch);
  } else if (genreId) {
    movieContainer.innerHTML = "";
    showLoading(textSearch);
    fetchMovieDataByGenre(genreId, currentPage, movieContainer, textSearch);
  }
}

async function fetchMovieDataByGenre(genreId, page = 1, movieContainer, textSearch) {
  try {
    if (page === 1) {
      movieContainer.innerHTML = ""
      showLoading(textSearch)
    }
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&language=en-US&page=${page}`,
      options
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    hideLoading()

    currentMovies = page === 1 ? data.results : [...currentMovies, ...data.results];
    displayMoviesFromTmdb(data.results, movieContainer, textSearch);
  } catch (error) {
    hideLoading()
    console.error("Error fetching movie data:", error)
    movieContainer.innerHTML = '<h2 class="text--search">Movie Not Found</h2>';
  }
}

async function getMoviesInfo(title, year = "", page = 1, movieContainer, textSearch) {
  try {
    if (page === 1) {
      movieContainer.innerHTML = "";
      showLoading(textSearch);
    }
    const response = await fetch(`${OMDB_API_URL}&s=${title}&y=${year}&page=${page}`);
    const data = await response.json();
    hideLoading();

    const movies = data.Search || [];
    if (movies.length > 0) {
      currentMovies = page === 1 ? movies : [...currentMovies, ...movies];
      displayMoviesFromOmdb(movies, movieContainer, textSearch);
    } else if (page === 1) {
      textSearch.innerHTML = `<h2 class="text--search">Movie Not Found</h2>`;
      movieContainer.innerHTML = "";
    }
  } catch (error) {
    hideLoading();
    console.error("Error:", error);
    movieContainer.innerHTML = `<h2 class="text--search">${error}</h2>`;
  }
}

function fetchMoreMovies() {
  const movieContainer = document.querySelector(".search-result");
  const textSearch = document.querySelector(".text--search");

  currentPage++;
  if (searchTerm) {
    getMoviesInfo(searchTerm, "", currentPage, movieContainer, textSearch);
  } else if (genreId) {
    fetchMovieDataByGenre(genreId, currentPage, movieContainer, textSearch);
  }
}

async function displayMoviesFromTmdb(movies, movieContainer, textSearch) {
  textSearch.innerHTML = `Program <span>${currentMovies.length}</span>`;
  movies.forEach(async (movie) => {
    const imdbID = await getImdbIdFromTmdbId(movie.id);
    const movieBox = document.createElement("div");
    movieBox.classList.add("movie-box");
    movieBox.innerHTML = /*html*/`
      <movie-card
        title='${movie.original_title}'
        imdb-id='${imdbID}'
        poster='https://image.tmdb.org/t/p/original/${movie.poster_path}'
        alt='${movie.original_title}'
      ></movie-card>
    `;
    movieContainer.appendChild(movieBox);
  });
}

function displayMoviesFromOmdb(movies, movieContainer, textSearch) {
  textSearch.innerHTML = `Program <span>${currentMovies.length}</span>`;
  movies.forEach((movie) => {
    const movieBox = document.createElement("div");
    movieBox.classList.add("movie-box");
    movieBox.innerHTML = /*html*/`
      <movie-card
        title='${movie.Title}'
        imdb-id='${movie.imdbID}'
        poster='${movie.Poster}'
        alt='${movie.Title}'
      ></movie-card>
    `;
    movieContainer.appendChild(movieBox);
  });
}

async function getImdbIdFromTmdbId(tmdbID) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${tmdbID}?api_key=${TMDB_API_KEY}&append_to_response=external_ids`
    );
    if (!response.ok) throw new Error(`API failed: ${response.status}`);
    const data = await response.json();
    return data.external_ids.imdb_id || null;
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}

loadMore.addEventListener('click', () => {
  fetchMoreMovies();
});
