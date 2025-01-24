import './details-row.js'
import { escapeHTML } from '../../utils/escapeHTML.js'; // escapeHTML 함수 import

class DetailsTextbox extends HTMLElement {
    constructor() {
        super()
    }
    static get observedAttributes(){
        return ['data']
    }
    connectedCallback(){
        this.classList.add('textbox'); // 기본적인 초기 설정만 처리
        // 데이터가 없으면 바로 렌더링하지 않고 기다림
        const data = this.getAttribute('data');
        if (!data) {
            console.error('Error: No data attribute provided.');
            this.innerHTML = '<p>Error: No data provided</p>';
            return;
        }
        // 데이터가 있을 경우 렌더링
        this.render();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'data' && newValue) {
            this.render(); // 속성이 변경되면 재렌더링
        }
    }
    
    render() {
        // data 속성 가져오기
        const rawData = this.getAttribute('data');
    
        // JSON 파싱 시도
        let parsedData = {};
        try {
            parsedData = JSON.parse(rawData);
        } catch (error) {
            console.error('Error: Invalid JSON data:', rawData);
            this.innerHTML = '<p>Error: Invalid data format</p>';
            return;
        }
    
        // 데이터 구조 분해 및 기본값 설정
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
        } = parsedData;
    
        // 데이터가 정상적으로 전달되었는지 로그 확인 (디버깅용)
        console.log('Parsed Data:', parsedData);
    
        // 감독과 배우 데이터를 `DetailsRow`에서 사용할 수 있도록 배열로 변환
        const crewData = crewName.map((name, index) => ({
            name,
            imgUrl: crewImgUrl[index] || '',
            castJob: 'Crew Member',
            country: country
        }));
        const castData = castName.map((name, index) => ({
            name,
            imgUrl: castImgUrl[index] || '',
            castJob: castJob[index] || 'Actor',
            country: country
        }));

        // HTML 생성
        this.innerHTML = `
        <div class="details">
            <!-- 연도 -->
            <details-row 
                title="Year" 
                type="text" 
                content="${year}">
            </details-row>
            
            <!-- 언어 -->
            <details-row 
                title="Languages" 
                type="list" 
                content='${JSON.stringify(language)}'>
            </details-row>
            
            <!-- 장르 -->
            <details-row 
                title="Genres" 
                type="list" 
                content='${JSON.stringify(genre)}'>
            </details-row>

            <!-- 감독 -->
            <details-row 
                title="Crew" 
                type="card-person" 
                category="director"
                content='${JSON.stringify(crewData)}'>
            </details-row>

            <!-- 배우 -->
            <details-row 
                title="Cast" 
                type="card-person" 
                category="actor"
                content='${JSON.stringify(castData)}'>
            </details-row>
        </div>
        `;
    }
}
customElements.define('details-textbox',DetailsTextbox)
