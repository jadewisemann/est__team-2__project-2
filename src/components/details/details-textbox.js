import './details-row.js'
class DetailsTextbox extends HTMLElement {
    constructor() {
        super()
        this.imdb_id = null;
    }
    connectedCallback(){
        this.classList.add('details'); // 기본적인 초기 설정만 처리
    }
    async setImdbId(id) {
        this.imdb_id = id;
        await this.render()
    }
    async getOmdbApiData() {
        const API_URL = 'http://www.omdbapi.com/?apikey=33c97183'
        try {
            const response = await fetch(`${API_URL}&i=${this.imdb_id}`)
            if(!response.ok){
                throw new Error("API 호출 실패")
            }
            return response.json()
        } catch (error) {
            console.error('문제발생',error);
        }
    }

    async getTmdbApiPersonData() {
        const API_KEY = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZjQ5MGFjODg1NmYyZDljNmQ1NjhiZDRkZjExZjM4ZSIsIm5iZiI6MTczNzAzNjIxNi43MDg5OTk5LCJzdWIiOiI2Nzg5MTFiODQ1ZjI5NmY2MDExZDQzODIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.P3tFzr6KGwZgZ2VEPnh7M_39YP8WwK-qU0gCO8Ii3g8'
            }
        };   
        
        try {  // ***imdb_id로 TmdbApi에서 TmdbApi의 ID받아오기***
        // [1] imdb_id로 요청보내서 응답받아옴
            const response_inquiry_imdbId = await fetch(`https://api.themoviedb.org/3/find/${this.imdb_id}?external_source=imdb_id`, API_KEY)                             
            
            if(!response_inquiry_imdbId.ok){
                throw new Error("API 호출 실패 : imdbId 조회")
            }
            const response_Tid = await response_inquiry_imdbId.json() // 응답받아 온 데이트를 json으로 변경
            console.log(response_Tid);
            
            const Tid = await response_Tid.movie_results[0].id // 해당 id 값만 담는다

        // [2] 얻어낸 id로 제작진 리스트 요청하여 응답받아옴
            const response = await fetch(`https://api.themoviedb.org/3/movie/${Tid}/credits?`, API_KEY)
            if(!response.ok){
                throw new Error("API 호출 실패 : Tmdb - id 조회")
            }
            return response.json() // 데이터는 json으로 변경하여 리턴함
        } catch (error) {
            console.error('문제발생',error);
        }
    }
        
    escapeHTML(jsonString){
        return jsonString
        .replace(/&/g, '&amp;')   // & → &amp;
        .replace(/"/g, '&quot;') // " → &quot;
        .replace(/'/g, '&#39;')  // ' → &#39;
        .replace(/</g, '&lt;')   // < → &lt;
        .replace(/>/g, '&gt;');  // > → &gt;
    }
    
    async render() {
        if (!this.imdb_id) {
            console.warn("render가 호출되었지만 IMDb ID가 설정되지 않았습니다.");
            return;
        }

        const dataOmdb = await this.getOmdbApiData()
        const dataTmdb = await this.getTmdbApiPersonData()
        
        /* Omdb data 정리 */
        console.log(dataOmdb)
        const {Year, Language, Ratings, Genre, Director, Country} = dataOmdb
        const language = Language ? Language.split(', ') : []
        const genre = Genre ? Genre.split(', ') : []
        const safeJSONLanguage = this.escapeHTML(JSON.stringify(language))
        const safeJSONGenre = this.escapeHTML(JSON.stringify(genre))
        const director = Director? Director.split(', ').map(name => ({name, country: Country})) : []
        const country = director.map(country=>country.country)
    
        /* Tmdb data 정리 */
        console.log(dataTmdb);
        const {cast, crew} = dataTmdb
        const crewImgUrl = crew.filter(person => person.job === "Director").map(director => director.profile_path)
        const crewName = crew.filter(person => person.job === "Director").map(name=> name.name)
        const castName = cast.filter(person => person.popularity >= 15).map(name=> name.name)
        const castImgUrl = cast.filter(person => person.popularity >= 15).map(name=> name.profile_path)
        const castJob = cast.filter(person => person.popularity >= 15).map(name=> name.known_for_department)
        
        this.innerHTML = `
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
                content = "${safeJSONLanguage}"
            ></details-row>
             
            <!-- 장르 -->
            <details-row
                title = "Gernes"
                type = "list"
                content = "${safeJSONGenre}"
            ></details-row>

            <!-- 감독 -->
            <details-row
                title = "Director"
                category = "director"
                type = "card-person"
                country ="${country}"
                name="${crewName}"
                img-url ="${crewImgUrl}"
                ></details-row>

            <!-- 배우 -->
            <details-row
                title = "Actor"
                category = "actor"
                type = "card-person"
                castJob ="${castJob}"
                name="${castName}"
                img-url ="${castImgUrl}"
                ></details-row>
        `
    }
}
customElements.define('details-textbox',DetailsTextbox)