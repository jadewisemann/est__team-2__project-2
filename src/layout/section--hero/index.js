import './hero--slider.js'

class SectionHero extends HTMLElement {

  constructor() {
    super()
  }
  
  connectedCallback() {
    this.render()
  }

  render() {

    this.innerHTML = /*html*/ `
    <div class="section--hero">
        <hero--slider> </hero--slider>
    </div>
    `

    const style = document.createElement('style')
    style.innerHTML = /*css*/`
    .section--hero {
      background-color: red;
      width: 100vw;
      height: 100vh;
    }
    `
    this.appendChild(style)
  }
}

customElements.define('section--hero', SectionHero);
