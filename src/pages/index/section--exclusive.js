// components
import '../../components/card-section.js'

// define custom element
class SectionExclusive extends HTMLElement {
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
      return data.popular
    } catch (error) {
      console.error(error)
      return null
    }
  }
  
  updateCardSection = cardIDs => {
    const cardSection = this.querySelector('card-section')
    if (cardSection) {
      cardSection.cardIDs = cardIDs
    }
  }

  loadData = async () => {
    const cardIDs = await this.fetchData();
    if (cardIDs) this.updateCardSection(cardIDs)
  }

  render = () => {
    // html
    this.innerHTML = /*html*/ `
    <div class="section--popular">
      <card-section title="Video on Exclusive"></card-section> 
    </div>
    `
  }
}

customElements.define('section--exclusive', SectionExclusive);
