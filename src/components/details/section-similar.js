// components
import '../../components/card-section.js'

// define custom element
class SectionSimilar extends HTMLElement {
  constructor() {
    super()
    this.data = null
  }
  
  connectedCallback() {
    this.render()
    this.loadData()
  }
  
  fetchData = async () => {
    try {
      const response = await fetch("/asset/data/data.json")
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()
      return data.similar
    } catch (error) {
      console.error(error)
      return null
    }
  }
  
  updateCardSection = similar => {
    const cardSection = this.querySelector('card-section');
    if (cardSection) {
      cardSection.cardIDs = similar
    }
  }

  loadData = async () => {
    const similar = await this.fetchData();
    if (similar) this.updateCardSection(similar)
  }

  render = () => {
    // html
    this.innerHTML = /*html*/ `
    <div class="section--similar">
      <card-section title="Similar movie similars"></card-section> 
    </div>
    `

    // css
    const style = document.createElement('style')
    style.innerHTML = /*css*/`
    `
    this.appendChild(style)
  }
}

customElements.define('section--similar', SectionSimilar);
