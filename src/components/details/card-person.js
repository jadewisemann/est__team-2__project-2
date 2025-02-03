class CardPerson extends HTMLElement{
  constructor() {
    super()
    this.rendered = false
  }

  connectedCallback() {
    if (!this.rendered) {
      this.render()
      this.rendered = true
    }
  }

  render() {
    // variable
    const imgUrl_tmdb = "https://image.tmdb.org/t/p/original"
    const alterImgUrl = `/asset/img/alt-poster.svg`

    // attribute
    const category = this.getAttribute('category') || ''
    const castJob = this.getAttribute('castJob')?.split(",") || []
    const name = this.getAttribute('name')?.split(",") || []
    const country = this.getAttribute('country')?.split(",") || []
    const rawImgUrl = this.getAttribute('imgUrl')?.split(",") || []

    // html
    this.classList.add('card__person', 'swiper-slide')

    this.innerHTML = name.map((personName, index) => {
      const p_content = 
        (category ==='director') 
          ? `<p>${country[index] || "Unknown Country"}</p>` :
        (category ==='actor') 
          ?`<p>${castJob[index] || "Unknown Job"}</p>` : ""
      const isImg  = rawImgUrl[index] ? true : false
      const imgSrc = isImg ? `${imgUrl_tmdb}${rawImgUrl[index]}` : alterImgUrl
      
      return /*html*/`
        <div class="card__person--img">
          <img src="${imgSrc}" alt="Profile picture" ${isImg ? "" :'style="transform:translate(0, 0);"'}>
        </div>
        <div class="card__person--contents">
            <h5>${personName}</h5>
            ${p_content}
        </div>
      `}).join('')
  }
}

customElements.define('card-person',CardPerson);

