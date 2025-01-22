import './details-row.js';

class DetailsTextbox extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback(){
        this.render()
    }
    
    async getApiData() {
        const API_URL = 'http://www.omdbapi.com/?apikey=33c97183'
        const title = 'frozen'
        try {
            const response = await fetch(`${API_URL}&t=${title}`)
            if(!response.ok){
                throw new Error("API 호출 실패");
            }
            return response.json()
        } catch (error) {
            console.error('문제발생',error);
        }
    }
        
    async render() {
        console.log('xxx');
        
        const data = await this.getApiData()
        console.log(data);

        const {Year, Language, Ratings, Genre, Director} = data

        const language = Language ? Language.split(', ') : []
        const genre = Genre ? Genre.split(', ') : []
        const director = Director ? Director.split(', ') : []
        
        // console.log(typeof Year);
        
        this.innerHTML = `
        <div class="details">
            <!-- 연도 -->
            <details-row 
                title = "Released Year"
                type = "text"
                content = "${Year}"
            ></details-row>

            <!-- 언어 -->
            <details-row
                title = "Available Languages"
                type = "list"
                content = "${JSON.stringify(language)}"
            ></details-row>
             
            <!-- 장르 -->
            <details-row
                title = "Available Languages"
                type = "list"
                content = "${JSON.stringify(genre)}"
            ></details-row>

            <!-- 감독 -->
            <details-row
                title = "Available Languages"
                type = "list"
                content = "${JSON.stringify(director)}"
            ></details-row>
        </div>
        `
    }
}
customElements.define('details-textbox',DetailsTextbox)