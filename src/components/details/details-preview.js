class DetailsPreview extends HTMLElement{
    constructor(){
        super()
    }
    connectedCallback(){
        this.render()
    }

    async getData(){
        const response = fetch()
    }

    render(){

    }
}
customElements.define('details-preview',DetailsPreview)