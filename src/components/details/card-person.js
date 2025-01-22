class CardPerson extends HTMLElement{
    constructor() {
        super()
    }
    connectedCallback(){
        this.render()
    }
    render(){
        const attribute = this.getAttribute(`attribute`) || 'default value' 

        this.innerHTML =`
        <div class="card__person">
            <div class="card__person--img">
                <img src="https://search.pstatic.net/common?type=b&size=3000&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F201703%2F2017032220095332-8659845.jpg" alt="Profile picture">
            </div>
            <div class="card__person--contents">
                <h5> name </h5>
                <p> country </p>
                <p> ${attribute} </p>
            </div>
        </div> 
        `
    }
}

customElements.define('card-person',CardPerson);