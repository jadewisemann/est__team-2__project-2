import '../components/movie-card.js'

const loadLikedMovies = () => {
  const openRequest = indexedDB.open('movieDB')
  openRequest.onupgradeneeded = event => {
    const db = event.target.result
    console.log('db',db)
    if (!db.objectStoreNames.contains('likedMovies')) {
      db.createObjectStore('likedMovies', { keyPath: 'imdbID' })
    }
  }

  openRequest.onsuccess = event => {
    const db = event.target.result
    const transaction = db.transaction('likedMovies', 'readonly')
    const store = transaction.objectStore('likedMovies')
    const getAllRequest = store.getAll()

    getAllRequest.onsuccess = () => {
      const movies = getAllRequest.result
      console.log('movies',movies)
      displayMovies(movies)
    }

    transaction.oncomplete = () => db.close()
  }

  openRequest.onerror = event => {
    console.error("indexedDB open fail", event)
  }
}

const displayMovies = movies => {
  const container = document.querySelector('.movies--container')
  container.innerHTML = movies.length
  ? movies.map(movie =>/*html*/`
      <movie-card
        title= '${movie.title}'
        poster= '${movie.poster}'
        imdb-id= '${movie.imdbID}'
        ratings= '${JSON.stringify(movie.ratings)}'
      ></movie-card>
    `).join('')
  : '<p>no like movie yet.</p>'
}

loadLikedMovies()

