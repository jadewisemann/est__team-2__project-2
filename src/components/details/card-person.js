class CardPerson extends HTMLElement{
    constructor() {
        super()
        this.rendered = false; // 중복 렌더링 방지 플래그
    }
    connectedCallback(){
        if (!this.rendered) { // 처음 렌더링일 때만 실행
            this.render();
            this.rendered = true;
        }
    }
    render(){
        this.classList.add('card')

        const imgUrl_tmdb = "https://image.tmdb.org/t/p/original"
        //데이터 가져오기
        const category = this.getAttribute('category') || ''
        const castJob = this.getAttribute('castJob')?.split(",") || []
        const name = this.getAttribute('name')?.split(",") || []
        const country = this.getAttribute('country')?.split(",") || []
        const imgUrl = this.getAttribute('imgUrl')?.split(",") || []

        const card = name.map((personName, index) => {
            //category로 구분
            let p_content = '';
            if(category ==='director'){
                p_content = `<p>${country[index] || "Unknown Country"}</p>`
            }
            else if(category ==='actor'){
                p_content = `<p>${castJob[index] || "Unknown Job"}</p>`
            }

            return `
            <div class="card__person">
                <div class="card__person--img">
                    ${imgUrl[index] ? `<img src="${imgUrl_tmdb}${imgUrl[index]}" alt="Profile picture">` : ""}
                </div>
                <div class="card__person--contents">
                    <h5>${personName}</h5>
                    ${p_content}
                </div>
            </div>
            `
        }).join('')

        this.innerHTML = card
    }
}

customElements.define('card-person',CardPerson);