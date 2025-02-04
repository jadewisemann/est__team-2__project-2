import '../../utils/movie-service.js' //페이지 연결할때 살리기
import { getOmdbApiData, getTmdbApiCreditsData } from '../../utils/movie-service.js';


const queryString = window.location.search
const params = new URLSearchParams(queryString)
const imdb_id = params.get('id'); //페이지 연결할때 살리기

export async function initializeDetailTextbox() {
    // const imdb_id = 'tt2294629'// imdb_id_dummy
    
    if (imdb_id) {

        try {
            const omdbDatas = await getOmdbApiData(imdb_id) // OMDb 데이터 가져오기
            const tmdbDatas = await getTmdbApiCreditsData(imdb_id) // TMDb 제작진 정보 가져오기
            
            return {omdbDatas,tmdbDatas}
            /*
            <details-page>를 거치지 않고 각각의 컴포넌트로 바로 데이터를 던지는 방법
            // details-textbox에 데이터 전달
            const detailsTextbox = document.querySelector('details-textbox')
            if(detailsTextbox){
                await detailsTextbox.setMovieDatas(omdbDatas, tmdbDatas)
            }
            
            // details-preview에 데이터 전달
            const detailsPreview = document.querySelector('details-preview')
            if(detailsPreview){
                await detailsPreview.setMovieDatas(omdbDatas, tmdbDatas)
            }
            */

        } catch (error) {
            console.error(`초기화 중 오류 발생: ${error.message}`)
            throw error // 상위 호출로 오류를 전달
        }
    }else{
        console.error('IMDb ID가 URL에 없습니다!')
        throw new Error('IMDb ID가 URL에 없습니다!') // 오류를 발생시켜 상위 호출로 전달
    }
}
// initializeDetailTextbox()