const API_KEY = '33c97183'
const API_URL = 'http://www.omdbapi.com'
const API_POSTER_URL = `http://www.img.omdbapi.com`
const fetchAPI = async (url) => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`response is not ok`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error fetching data: ${error}`)
    throw error
  }
}

export const getSearchResult = async (title, year=``, page=1) => {
  const data = await fetchAPI(`${API_URL}?apikey=${API_KEY}&s=${title}&y=${year}&page=${page}`);
  return {...data.Search}
}

export const getSearchResultMore = async (title, year=``, page=1) => {
  const data = await fetchAPI(`${API_URL}?apikey=${API_KEY}&s=${title}&y=${year}&page=${page}`);
  return {...data.Search}
}


export const getMovieDetail = async (imdbID) => {
  return await fetchAPI(`${API_URL}?apikey=${API_KEY}&i=${imdbID}`);
}


export const getMovieDetailHiRes = async (imdbID) => {
  const movieDetails = await getMovieDetail(imdbID)
  try {
    const poster = await fetchAPI(`${API_POSTER_URL}?apikey=${API_KEY}&i=${imdbID}`)
    if (!poster.ok) {
      throw new Error(`can't fetch high-res poster`)
    }
    movieDetails.Poster = poster
    return movieDetails          
  } catch (error) {
    console.error(error)
    return movieDetails
  }
}