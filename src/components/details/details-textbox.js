import './details-row.js'
import { escapeHTML } from '../../utils/escapeHTML.js'

const loadingAnimation = /*html*/`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="#3887FF" stroke="#3887FF" stroke-width="8" width="30" height="30" x="25" y="85"><animate attributeName="opacity" calcMode="spline" dur="3" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></rect><rect fill="#3887FF" stroke="#3887FF" stroke-width="8" width="30" height="30" x="85" y="85"><animate attributeName="opacity" calcMode="spline" dur="3" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></rect><rect fill="#3887FF" stroke="#3887FF" stroke-width="8" width="30" height="30" x="145" y="85"><animate attributeName="opacity" calcMode="spline" dur="3" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></rect></svg>
`

class DetailsTextbox extends HTMLElement {
  constructor() {
    super()
    this._errorTimer = null
  }

  static get observedAttributes() {
    return ['data']
  }

  connectedCallback() {
    this.classList.add('textbox')

    this.innerHTML = `<p style="width: 120px; margin: 0 auto;" >${loadingAnimation}</p>`

    this._errorTimer = setTimeout(() => {
      if (!this.hasValidData()) {
        console.error('Error: No data attribute provided.')
        this.innerHTML = '<p>Error: No data provided</p>'
      }
    }, 3000)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data' && newValue) {
      if (this._errorTimer) {
        clearTimeout(this._errorTimer)
        this._errorTimer = null
      }
      this.render()
    }
  }

  hasValidData() {
    const data = this.getAttribute('data')
    return data && data.trim() !== ''
  }

  render() {
    const rawData = this.getAttribute('data')

    let parsedData = {}
    try {
      parsedData = JSON.parse(rawData)
    } catch (error) {
      console.error('Error: Invalid JSON data:', rawData)
      this.innerHTML = '<p>Error: Invalid data format</p>'
      return
    }

    const {
      year = 'Unknown Year',
      language = [],
      genre = [],
      country = [],
      crewName = [],
      crewImgUrl = [],
      castJob = [],
      castName = [],
      castImgUrl = [],
    } = parsedData

    console.log('Parsed Data:', parsedData)

    const crewData = crewName.map((name, index) => ({
      name,
      imgUrl: crewImgUrl[index] || '',
      castJob: 'Crew Member',
      country,
    }))

    const castData = castName.map((name, index) => ({
      name,
      imgUrl: castImgUrl[index] || '',
      castJob: castJob[index] || 'Actor',
      country,
    }))

    this.innerHTML = `
      <div class="details">
        <!-- 연도 -->
        <details-row 
          title="Year" 
          type="text" 
          content="${escapeHTML(year)}">
        </details-row>
        
        <!-- 언어 -->
        <details-row 
          title="Languages" 
          type="list" 
          content='${escapeHTML(JSON.stringify(language))}'>
        </details-row>
        
        <!-- 장르 -->
        <details-row 
          title="Genres" 
          type="list" 
          content='${escapeHTML(JSON.stringify(genre))}'>
        </details-row>
        
        <!-- 감독 -->
        <details-row 
          title="Crew" 
          type="card-person" 
          category="director"
          content='${escapeHTML(JSON.stringify(crewData))}'>
        </details-row>
        
        <!-- 배우 -->
        <details-row 
          title="Cast" 
          type="card-person" 
          category="actor"
          content='${escapeHTML(JSON.stringify(castData))}'>
        </details-row>
      </div>
    `
  }
}

customElements.define('details-textbox', DetailsTextbox)
