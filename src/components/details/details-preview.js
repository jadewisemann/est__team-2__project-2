class DetailsPreview extends HTMLElement{
    constructor(){
        super()
    }
    static get observedAttributes(){
        return ['title','plot','poster','genre','rated']
    }
    connectedCallback(){
        this.classList.add('previewbox'); // 기본적인 초기 설정만 처리

        const title = this.getAttribute('title');
        const plot = this.getAttribute('plot');
        const poster = this.getAttribute('poster');
        const genre = this.getAttribute('genre');
        const rated = this.getAttribute('rated');

        // 데이터가 없으면 바로 렌더링하지 않고 기다림
        if (!title && !plot && !poster && !genre && !rated) {
            console.error('Error: No data attribute provided.');
            this.innerHTML = '<p>Error: No data provided</p>';
            return;
        }
        this.render()
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render(); // 속성 변경 시 재렌더링
        }
    }
    render(){
        // 데이터 가져오기
        const title = this.getAttribute('title');
        const plot = this.getAttribute('plot');
        const poster = this.getAttribute('poster');
        const genre = this.getAttribute('genre');
        const rated = this.getAttribute('rated');
        // console.log('poster:', poster);
        // console.log('genre:', genre);
        // 관람가 이미지 설정
        
        const ageMapping ={
            'N/A':'all', 'G':'all', 'PG':12, 'R': 15, 'NC-17':19
        }
        const age = ageMapping[rated] || 'all'
        const ratedUrl =`../asset/img/element-icons-72-x-72-ic-movie-${age}-years.svg`

        const parseGenre = genre? JSON.parse(genre.replace(/&quot;/g,'"')) : []

        this.innerHTML = `
        <div class="preview">
            <div class="preview__contents">
                <h2 class="preview__title">${title}</h2>
                <div class="preview__labelgroup">
            
                    <img class="icon-years" src="${ratedUrl}" alt="" srcset="">
                    ${
                        parseGenre.map(item =>
                            `<span class="preview__tag">${item}</span>`
                        ).join('')
                    }             
                </div>
                <button type="button" class="btn previews__btn--watch"> 
                    <i class="fa-solid fa-play"></i><span>Watch</span>
                </button>
                <p class="preview__description">${plot}</p>
            </div>
            <div class="preview__poster">
                <img src="${poster}" alt="movie poster">
            </div>
            <div class="preview__poster--bg">
                <img src="${poster}" alt="movie poster">
            </div>
        </div>
        `
    }
}
customElements.define('details-preview',DetailsPreview)