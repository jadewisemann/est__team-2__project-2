class MovieCard extends HTMLElement {

  // constructor() {
  //   super()
  // }

  connectedCallback() {
    this.render()
  }
  
  render() {
    const title = this.getAttribute(`title`) || 'title'
    const year  = this.getAttribute(`year`) || 'year'
    const imdbID  = this.getAttribute(`imdb-id`) || 'imbdId'
    const type  = this.getAttribute(`type`) || 'type'
    const poster = this.getAttribute(`poster`) || 'poster'
    
    this.innerHTML = `
    <div class="movie-card">@this is movie card
      <div class="movie-card__title">${title}</div>
      <div class="movie-card__year">${year}</div>
      <div class="movie-card__imdb-id">${imdbID}</div>
      <div class="movie-card__type">${type}</div>
      <img class="movie-card__poster" src=${poster} ></img>
    </div>
    `
  }
}

customElements.define('movie-card', MovieCard);
