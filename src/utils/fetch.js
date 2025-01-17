const API_URL = 'http://www.omdbapi.com/?apikey=33c97183'

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
  const data = await fetchAPI(`${API_URL}&s=${title}&y=${year}&page=${page}`);
  return {...data.Search}
}

export const getSearchResultMore = async (title, year=``, page=1) => {
  const data = await fetchAPI(`${API_URL}&s=${title}&y=${year}&page=${page}`);
  return {...data.Search}
}


export const getMovieDetail = async (imdbID) => {
  return await fetchAPI(`${API_URL}&i=${imdbID}`);
}
