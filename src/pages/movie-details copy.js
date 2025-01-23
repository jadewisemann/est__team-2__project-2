

// 상세로 넘오는 클릭 이벤트 발생시 호툴하는 함수에 데이터
// 페이지가 로드되면 실행되니까
// api를 호출해서 받아온다.
// 밸류를 받아서 파라미터로 실행
// 호출 값으로 넣어서 api데이터 당겨오기 


// ((리터럴로)) -> 파라미터 
// http://www.omdbapi.com/?apikey=33c97183&t=Aladdin
// http://www.omdbapi.com/?apikey=33c97183&t=frozen
// http://www.omdbapi.com/?apikey=33c97183&y=2019
// http://www.omdbapi.com/?apikey=33c97183&type=tt0103639
// http://www.omdbapi.com/?apikey=33c97183&t=Aladdin&y=2019
async function getApiData(){
    const API_URL = 'http://www.omdbapi.com/?apikey=33c97183'    

    const title ='frozen'
    const year  = 2019
    const page  =''
    const imdbID =''
    
    try {
        const response = await fetch(`${API_URL}&t=${title}&y=${year}`)
        if(!response.ok){
            throw new Error('response error')
        }
        const data = await response.json()
        rander(data)
    } catch (error) {
        new Error('error : '+ error)
        console.error('문제가 발생했습니다',error)   
    }
}
getApiData()

function rander(data) {
    const details = document.querySelector('.details')    
    details.innerHTML = `
    <div class="details__row">
        <h4 class="text--title__detail">${data.Title}</h4>
        <p class="text--contents__detail">${data.Year}</p>
    </div>
    `
}

// 클래스 선언
// 디파인