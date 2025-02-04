// movie-service.js (API 호출을 위한 별도 모듈)
const omdb_API_URL = 'https://www.omdbapi.com/?apikey=33c97183'
const tmdb_API_URL = 'https://api.themoviedb.org/3'
const tmdb_API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZjQ5MGFjODg1NmYyZDljNmQ1NjhiZDRkZjExZjM4ZSIsIm5iZiI6MTczNzAzNjIxNi43MDg5OTk5LCJzdWIiOiI2Nzg5MTFiODQ1ZjI5NmY2MDExZDQzODIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.P3tFzr6KGwZgZ2VEPnh7M_39YP8WwK-qU0gCO8Ii3g8'

const fetchAPI = async (url, options = {}) => {
    try {
        const response = await fetch(url, options)
        if(!response.ok){
            throw new Error(`HTTP Error! status:${response.status}`)
        }
        return await response.json()
    } catch (error) {
        console.error(`error fetching data! :${error.message}`);
        throw error
    }
}

export const getOmdbApiData = async (imdbID) => {
    if(!imdbID){
        throw new Error('IMDb ID가 필요합니다.');
    }
    const url = `${omdb_API_URL}&i=${imdbID}`
    return await fetchAPI(url)
}

export const getTmdbApiCreditsData = async (imdbID) => {
    if(!imdbID){
        throw new Error('IMDb ID가 필요합니다.');
    }
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: tmdb_API_KEY
        }
    }
     // [1] IMDb ID로 TMDb ID 조회
    const tmdbIdResponse = await fetchAPI(
        `${tmdb_API_URL}/find/${imdbID}?external_source=imdb_id`, options
    )
    const tmdbMovie = tmdbIdResponse.movie_results?.[0]
    console.log(tmdbMovie);
    console.log(imdbID);
    
    if(!tmdbMovie){
        throw new Error(`TMDb에서 IMDb ID(${imdbID})로 영화를 찾을 수 없습니다.`);
    }
    const tmdbId = tmdbMovie.id;
    // [2] TMDb ID로 제작진 정보 조회
    const creditsResponse = await fetchAPI(
        `${tmdb_API_URL}/movie/${tmdbId}/credits?`, options
    )
    return creditsResponse
}

// HTML 태그 속성에서 안전 문자열로 변환
export const escapeHTML = (unsafeString) => {
    return unsafeString
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };