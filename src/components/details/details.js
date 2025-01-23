import './details-preview.js'
import './details-textbox.js'

const queryString = window.location.search;
const params = new URLSearchParams(queryString);

// const imdb_id = params.get('imdb_id'); //페이지연결할때 살리기
const imdb_id = 'tt2294629'// imdb_id_dummy

async function initializeDtailTextbox() {
    console.log(imdb_id);
    
    if (imdb_id) {
        const detailstextbox = document.querySelector('details-textbox')
        if(detailstextbox){
            await detailstextbox.setImdbId(imdb_id)
        }
    }else{
        console.error('IMDb ID가 URL에 없습니다!');
    }
}
initializeDtailTextbox()