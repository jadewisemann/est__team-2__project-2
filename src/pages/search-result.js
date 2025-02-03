document.addEventListener("DOMContentLoaded", () => {
  //변수 설정 및 url/ key
  const movieContainer = document.querySelector(".search-result");
  const textSearch = document.querySelector(".text--search");
  const TMDB_API_KEY = "d5e4a2eb5fb264de1583b6945d203546";
  const OMDB_API_URL = "http://www.omdbapi.com/?apikey=33c97183";
  let currentMovies = [];
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  };
  const searchTerm = getQueryParam("title");
  const genreId = getQueryParam("genre");

  //   // URL 파라미터 가져오기 및 값에 따른 tmdb / omdb 활용
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  if (searchTerm) {
    getMoviesInfo(searchTerm);
  } else if (genreId) {
    fetchMovieDataByGenre(genreId);
  }

  // tmdb 가져오기
  async function fetchMovieDataByGenre(genreId) {
    try {
      movieContainer.innerHTML = '<h2 class="text--search">Loading...</h2>';
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&language=en-US&page=1`,
        options
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      currentMovies = data.results;
      displayMoviesFromTmdb(currentMovies);
    } catch (error) {
      console.error("Error fetching movie data:", error);

      movieContainer.innerHTML =
        '<h2 class="text--search">Movie Not Found</h2>';
    }
  }

  // tbdb id값 imdb id로 변환
  async function getImdbIdFromTmdbId(tmdbID) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${tmdbID}?api_key=${TMDB_API_KEY}&append_to_response=external_ids`
      );

      if (!response.ok) {
        throw new Error(`API fales: ${response.status}`);
      }

      const data = await response.json();
      return data.external_ids.imdb_id || null;
    } catch (error) {
      console.error("error:", error.message);
      return null;
    }
  }

  // tmdb 무비 포스터 구현
  async function displayMoviesFromTmdb(movies) {
    movieContainer.innerHTML = "";
    textSearch.innerHTML = `Program <span>${movies.length}</span>`;

    if (movies.length === 0) {
      movieContainer.innerHTML =
        '<h2 class="text__search">Movie Not Found </h2>';
      return;
    }

    movies.forEach(async (movie) => {
      const imdbID = await getImdbIdFromTmdbId(movie.id);
      const movieBox = document.createElement("div");

      if (movie) {
        movieBox.classList.add("movie-box");
        movieBox.innerHTML = `
          <div class="movie-card">
            <img src="https://image.tmdb.org/t/p/original/${
              movie.poster_path !== "N/A"
                ? movie.poster_path
                : "./../asset/images/no-image.svg"
            }" alt="${movie.original_title}">
          </div>
          <h3 class="movie-card__title">${movie.original_title}</h3>
        `;

        //포스터 클릭시 imdb 전달
        movieBox.addEventListener("click", () => {
          window.location.href = `movie-details.html?id=${imdbID}`;
        });

        movieContainer.appendChild(movieBox);
      }
    });
  }

  // omdb로 가져오기
  async function getMoviesInfo(title, year = "") {
    try {
      movieContainer.innerHTML = '<h2 class="text__search">Loading...</h2>';
      const pageRequests = [1, 2].map((page) =>
        fetch(`${OMDB_API_URL}&s=${title}&y=${year}&page=${page}`).then((res) =>
          res.json()
        )
      );

      const results = await Promise.all(pageRequests);
      const allMovies = results.flatMap((result) => result.Search || []);

      if (allMovies.length > 0) {
        currentMovies = allMovies;
        displayMoviesFromOmdb(allMovies);
      } else {
        textSearch.innerHTML = `<h2 class="text__search">Movie Not Found </h2>`;
        movieContainer.innerHTML = "";
        searchInput.value = "";
      }
    } catch (error) {
      console.error("Error:", error);
      movieContainer.innerHTML = `<h2 class="text__search">${error}</h2>`;
    }
  }
  // omdb포스터 구현
  function displayMoviesFromOmdb(movies) {
    movieContainer.innerHTML = "";

    textSearch.innerHTML = `Program <span>${movies.length}</span>`;
    if (movies.length === 0) {
      movieContainer.innerHTML =
        '<h2 class="text__search">Movie Not Found </h2>';
      return;
    }

    movies.forEach((movie) => {
      const movieBox = document.createElement("div");
      movieBox.classList.add("movie-box");

      movieBox.innerHTML = `
        <div class="movie-card">
          <img src="${
            movie.Poster !== "N/A"
              ? movie.Poster
              : "/est__team-2__project-2/asset/images/no-image.svg"
          }" alt="${movie.Title}">
        </div>
        <h3 class="movie-card__title">${movie.Title}</h3>
      `;

      movieBox.addEventListener("click", () => {
        window.location.href = `movie-details.html?id=${movie.imdbID}`;
      });

      movieContainer.appendChild(movieBox);
    });
  }
});
