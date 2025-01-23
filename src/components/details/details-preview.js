class DetailsPreview extends HTMLElement{
    constructor(){
        super()
        this.imdb_id = null;
    }
    connectedCallback(){
        // this.render()
    }
    async setImdbId(id){
        this.imdb_id = id
        await this.render
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
    

    async render(){
        const dataOmdb = await this.getOmdbApiData()



    }
}
customElements.define('details-preview',DetailsPreview)