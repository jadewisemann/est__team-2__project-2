// components
import '../components/card-section.js'

// define custom element
class SectionRecommendation extends HTMLElement {
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
      return data.recommendation
    } catch (error) {
      console.error("Failed to fetch recommendation data:", error)
      return null
    }
  }
  
  updateCardSection = recommendation => {
    const cardSection = this.querySelector('card-section');
    if (cardSection) {
      cardSection.cardIDs = recommendation
    }
  }

  loadData = async () => {
    const recommendation = await this.fetchData();
    if (recommendation) this.updateCardSection(recommendation)
  }

  render = () => {
    // html
    this.innerHTML = /*html*/ `
    <div class="section--recommendation">
      <card-section title="Must - Watch Shows"></card-section> 
    </div>
    `

    // css
    const style = document.createElement('style')
    style.innerHTML = /*css*/`
    `
    this.appendChild(style)
  }
}

customElements.define('section--recommendation', SectionRecommendation);
