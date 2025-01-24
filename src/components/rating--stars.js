// components

// define custom element
class RatingStars extends HTMLElement {
  constructor() {
    super()
  }
  
  connectedCallback() {
    this.render()
  }
  
  parseScore = score => 
    score === "N/A" ? "N/A" :
    typeof score === "string" && score.includes("%") 
      ? Math.round((parseFloat(score.replace("%", "")) / 100) * 5 * 10) / 10 :
    typeof score === "string" && score.includes("/")
      ? (() => {
        const [numerator, denominator] = score.split("/").map(parseFloat);
        return Math.round((numerator / denominator) * 5 * 10) / 10;
      })() :
    typeof score === "number"
      ? Math.round((score / 10) * 5 * 10) / 10
    : (() => { throw new Error("Invalid score format: " + score); })();


  changeStarScore = score => {
    const maxStars = 5

    const filledStars = Math.floor(score)
    const hasHalfStar = score - filledStars >= 0.5
    const emptyStars = maxStars - filledStars - (hasHalfStar ? 1 : 0)
    const stars = '★'.repeat(filledStars) + (hasHalfStar ? '⯨' : '') + '☆'.repeat(emptyStars);
    
    return score === 'N/A' ? score : stars 
  }

  render() {
    
    // attribute
    const score = this.getAttribute('score')
    const parseScore = this.parseScore(score)
    const stars = this.changeStarScore(parseScore)
    console.log('stars',stars)

    // html
    this.innerHTML = /*html*/ `
     <span class="stars">
      ${stars}
     </span> 
    `

    // css
    const style = document.createElement('style')
    style.innerHTML = /*css*/`
    
    .stars {
      color: white;
    }`
    this.appendChild(style)
    
  }
}

customElements.define('rating-stars', RatingStars);
