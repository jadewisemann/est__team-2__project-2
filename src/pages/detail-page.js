import '../components/details/load-movie-data.js';
import { initializeDtailTextbox } from '../components/details/load-movie-data.js';
import { escapeHTML } from '../utils/escapeHTML.js'; // escapeHTML 함수 import
import '../components/details/details-textbox.js'; // details-textbox 컴포넌트 import
import '../components/details/details-preview.js'; // details-preview 컴포넌트 import

class DetailsPage extends HTMLElement {
    constructor() {
        super()
    }

    async connectedCallback(){
        this.classList.add('wrap__movie-details'); // 기본적인 초기 설정만 처리
        try {
            const {omdbDatas,tmdbDatas} = await initializeDtailTextbox()
            // console.log('omdbDatas:', omdbDatas);
            // console.log('tmdbDatas:', tmdbDatas);
            
            /* Omdb data 정리 */
            const {Language, Genre, Director, Country} = omdbDatas
            const language = Language ? Language.split(', ') : []
            const genre = Genre ? Genre.split(', ') : []
            const director = Director? Director.split(', ').map(name => ({name, country: Country})) : []
            const country = director.map(item =>item.country)
            
            /* Tmdb data 정리 */
            const {cast, crew} = tmdbDatas
            const crewName = crew.filter(person => person.job === "Director").map(item=> item.name)
            const crewImgUrl = crew.filter(person => person.job === "Director").map(item => item.profile_path)
            const castName = cast.filter(person => person.popularity >= 15).map(item=> item.name)
            const castImgUrl = cast.filter(person => person.popularity >= 15).map(item=> item.profile_path)
            const castJob = cast.filter(person => person.popularity >= 15).map(item=> item.known_for_department)
            
            // 하위 컴포넌트에 데이터 셋팅
            const details_preview = this.querySelector('details-preview')
            if(details_preview){
                details_preview.setAttribute('title', omdbDatas.Title)
                details_preview.setAttribute('plot', omdbDatas.Plot)
                details_preview.setAttribute('poster', omdbDatas.Poster)
                details_preview.setAttribute('genre', escapeHTML(JSON.stringify(genre)))
                details_preview.setAttribute('rated', omdbDatas.Rated)
            }
            
            // 하위 컴포넌트에 데이터 셋팅
            const details_textbox = this.querySelector('details-textbox')
            if(details_textbox){
                const data = JSON.stringify({
                    year: omdbDatas.Year,
                    language, genre, country, crewName, crewImgUrl, castName, castImgUrl, castJob
                })
                details_textbox.setAttribute('data', data)
            }
        } catch (error) {
            console.error(`데이터 로드 실패: ${error.message}`)
        }
    }
}

customElements.define('details-page', DetailsPage)