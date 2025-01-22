
export class TestComp extends HTMLElement {

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

    // set inner html 
    this.shadowRoot.innerHTML = /*html*/ `
    <p>this is test comp</p>
    `

    // set style
    const style = document.createElement('style')
    style.innerHTML = /*css*/`
    p {
      color: red;
      border: 1px solid red;
    }
    `
    this.shadowRoot.appendChild(style)
  }
}

customElements.define('test-comp', TestComp);
