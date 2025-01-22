class DetailsRow extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback(){
        this.render()
    }
    render(){
        const title = this.getAttribute('title') || ''
        const type = this.getAttribute('type') || 'text'
        const content = this.getAttribute('content') || ''
        let rowContent = ''

        console.log(type);
        
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
        }else{
            rowContent = `???`
        }


        this.innerHTML=`
        <div class="details__row">
            <h4 class="text--title__detail">${title}</h4>
            ${rowContent}
        </div>
        `
    }
}
customElements.define('details-row',DetailsRow)