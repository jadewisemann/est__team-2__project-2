import './card-person.js'

class DetailsRow extends HTMLElement {
    constructor() { //브라우저가 DOM을 평가할 때
        super() //클래스 문법//HTMLElement의 상속 어쩌구 먼저 실행
    }
    connectedCallback(){ // 브라우저가 돔 트리에 부착할 때 실행
        this.render()
    }
    render(){
        const title = this.getAttribute('title') || ''
        const type = this.getAttribute('type') || 'text'
        const content = this.getAttribute('content') || ''
        
        const category = this.getAttribute('category') || ''
        const name = this.getAttribute('name') || ''
        const country = this.getAttribute('country') || ''
        const imgUrl = this.getAttribute('img-url') || ''
        const castJob = this.getAttribute('castJob') || ''

        this.classList.add("details__row")        
        
        let rowContent = ''

        if(type === 'text'){
            rowContent = `<p class="text--contents__detail">${content}</p>`
        }else if(type === 'list'){
            const items = JSON.parse(content)
            rowContent = `
            <div class="col--list">
                ${
                    items.map(item => {
                        return `<span class="preview__tag">${item}</span>`
                    }).join('')
                }
            </div>
            `
        }else if(type ==='card-person'){

            rowContent = `
            <card-person
                category="${category}"
                name="${name}"
                country="${country}"
                castJob="${castJob}"
                img-url="${imgUrl}"
            ></card-person>`
        }else{
            rowContent = `???`
        }

        this.innerHTML=`
            <h4 class="text--title__detail">${title}</h4>
            ${rowContent}
        `
    }
}
customElements.define('details-row',DetailsRow)