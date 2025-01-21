import './hero--slider.js'

class SectionHero extends HTMLElement {

  constructor() {
    super()
    this.attachShadow({mode: 'open'})
  }
  
  connectedCallback() {
    this.render()
  }

  render() {
    
    // get attribute
    // const attribute = this.getAttribute(`attribute`) || 'attribute'
    const poster = ''
    // set inner html 
    this.shadowRoot.innerHTML = /*html*/ `
    <div>this is section hero</div> 
    <hero--slider> </hero--slider>
    `
   // <hero--slider/>

    // set style
    const style = document.createElement('style')
    style.innerHTML = /*css*/`
      .section--hero--container {
          background-image: url(${poster});
          width: 100%;
          aspect-ratio: 16/9;
      }
    `
    this.shadowRoot.appendChild(style)
  }
}

customElements.define('section--hero', SectionHero);
