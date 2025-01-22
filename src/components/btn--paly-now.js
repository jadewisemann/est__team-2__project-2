class BtnPlayNow extends HTMLElement {

  constructor() {
    super()
  }

  connectedCallback() {
    this.render()
  }
  
  render() {   
    const imdbID  = this.getAttribute(`imdbID`) || 'imdbID'

    this.innerHTML = /*html*/`    
      <button class="btn--play-now">
          <a href="movie-detail.html?i=${imdbID}" class="btn--play-now__anchor">
              Play Now
          </a> 
      </button>
    `
    const style = document.createElement('style')
    style.innerHTML = /*css*/`
   .btn--play-now {
    display: flex;
    width: 155px;
    height: 64px;
    padding: 14px 24px;
    align-items: center;
    gap: 4px;
    border-radius: 8px;
    background: #3887FF;
  }
  .btn--play-now__anchor {
    width: 107px;
    height: 28px;
    flex-shrink: 0;
    color: #FFF;
    text-align: center;
    font-family: Manrope;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 153%; /* 27.54px */
  }
   
    `
    this.appendChild(style)
  }
}

customElements.define('btn--play-now', BtnPlayNow);
