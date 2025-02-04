
class RatingStars extends HTMLElement {
  //* life cycle call back
  constructor() {
    super()
  }
  
  connectedCallback() {
    this.render()
  }

  //* methods
    parseScore = score => 
      score === "N/A" 
        ? "N/A"
        : typeof score === "string" && score.includes("%") 
        ? Math.round((parseFloat(score.replace("%", "")) / 100) * 5 * 10) / 10
        : typeof score === "string" && score.includes("/")
        ? (() => {
            const [numerator, denominator] = score.split("/").map(parseFloat);
            return Math.round((numerator / denominator) * 5 * 10) / 10;
          })() 
        : typeof score === "number"
        ? Math.round((score / 10) * 5 * 10) / 10
        : (() => {
            throw new Error("Invalid score format: " + score)
          })();

  changeStarScore = score => {
    const maxStars = 5

    const filledStars = Math.floor(score)
    const hasHalfStar = score - filledStars >= 0.5
    const emptyStars = maxStars - filledStars - (hasHalfStar ? 1 : 0)

    const starFull = `<img src="/asset/img/star_full.svg" alt="star full" />`
    const starHalf = `<img src="/asset/img/star_half.svg" alt="star half" />`
    const starEmpty = `<img src="/asset/img/star_empty.svg" alt="star empty" />`

    const stars = [
      ...Array(filledStars).fill(starFull),
      ...(hasHalfStar ? [starHalf] : []),
      ...Array(emptyStars).fill(starEmpty)
    ].join("");

    // const stars = '★'.repeat(filledStars) + (hasHalfStar ? '⯨' : '') + '☆'.repeat(emptyStars);
    // return score === 'N/A' ? score : stars 
  
    return stars;
  }


  //* render
  render() {
    
    //* get, attribute
    const ratings = JSON.parse(this.getAttribute('ratings') || [])
    const ratingScore = this.getAttribute('rating-score')
    const parsedScore = this.parseScore(ratingScore)
    const stars = this.changeStarScore(parsedScore)
    const ratingSource = this.getAttribute('rating-source')
  
    //* set, initial html
    this.innerHTML = /*html*/ `
      <span class="stars"> ${stars} </span> 
    `
  }
}

customElements.define('rating-stars', RatingStars);
