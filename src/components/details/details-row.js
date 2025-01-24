import './card-person.js'

class DetailsRow extends HTMLElement {
    constructor() { //브라우저가 DOM을 평가할 때
        super() //클래스 문법//HTMLElement의 상속 어쩌구 먼저 실행
    }
    static get observedAttributes(){
        return ['title', 'type', 'content', 'category']
    }    
    connectedCallback() {
        this.render() // 초기 렌더링
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render() // 속성 변경 시 재렌더링
        }
    }


    render(){
        // 속성값 가져오기
        const title = this.getAttribute('title') || 'No Title'
        const type = this.getAttribute('type') || 'text'
        const content = this.getAttribute('content') || ''
        const category = this.getAttribute('category') || ''
        
        // 콘텐츠 타입에 따른 내용 생성
        let rowContent = ''
        try {
            if(type === 'text'){
                rowContent = `<p class="text--contents__detail">${content}</p>`
            }else if(type === 'list'){
                const items = JSON.parse(content) // JSON 문자열을 배열로 파싱
                rowContent = `
                    <div class="col--list">
                        ${
                            items
                            .map( item => `<span class="preview__tag">${item}</span>`)
                            .join('')
                        }
                    </div>
                `
            }else if(type ==='card-person'){
                const items = JSON.parse(content)
                const colClass = items.length <= 2 ? 'col--list col-2' : 'col--list'
                // <div class="${colClass} swiper mySwiper">
                rowContent = `
                    <div class="swiper mySwiper ${colClass}">
                        <div class="swiper-wrapper card">
                        ${items.map(item => `
                            <card-person
                                category="${category}"
                                castJob="${item.castJob || 'Unknown Job'}"
                                name="${item.name || 'Unknown'}"
                                country="${item.country || 'Unknown Country'}"
                                imgUrl="${item.imgUrl || ''}"
                            ></card-person>`
                            ).join('')}
                        </div>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-pagination"></div>
                    </div>
                    `
            }else{
                rowContent = `<p>Unknown Type</p>`
        }} catch (error) {
            console.error('Error parsing content:', error)
            rowContent = `<p>Error: Invalid content format</p>`
        }

         // 최종 HTML 렌더링
        this.innerHTML=`
        <div class="details__row">
            <h4 class="text--title__detail">${title}</h4>
            ${rowContent}
        </div>
        `

        this.swiperInstance = new Swiper(".mySwiper", {
            slidesPerView: 4.5,
            spaceBetween: 10,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }
}
customElements.define('details-row',DetailsRow)
