//* import, components
import './hero--slider.js'

//* define, class
class SectionHero extends HTMLElement {
  //* use life cycle call back
  constructor() {
    super()
  }

  connectedCallback() {
    this.render()
  }


  //* fectch data
  async getData() {
    try {
      const response = await fetch('/asset/data/tmdb-result.json');
      const { "image-url": imageURL, results } = await response.json();
      return { imageURL, results }
    } catch (error) {
      console.error('Error fetching or generating slides:', error);
      return { imageURL: '', results: [] }
    }
  }

  //* render 
  async render() {
    console.log(`hero`)
    //* fetch data
    const { imageURL, results } = await this.getData()

    //* html
    this.innerHTML = /*html*/ `
    <div class="section--hero">
        <hero--slider> </hero--slider>
    </div>
    `

    //* set properies to hero--slider
    const heroSlider = this.querySelector('hero--slider')
    if(heroSlider) {
      console.log("parent, iamgeURL", imageURL )
      console.log("parent, results", results)
      heroSlider.imageURL = imageURL
      heroSlider.results = results
    }

    //* style
    const style = document.createElement('style')
    style.innerHTML = /*css*/`
    .section--hero {
      width: 100vw;
      height: 92vh;
    }
    `
    this.appendChild(style)
  }
}

//* declare, custom-elemnente
customElements.define('section--hero', SectionHero);
