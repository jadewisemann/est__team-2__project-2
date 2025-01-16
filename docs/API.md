# API

원본: https://www.omdbapi.com/

요청 주소는 팀 디스코드에 있음

## 검색 결과 요청

### 파라미터

Parameter | Required | Valid options | Default Value | Description
-- | -- | -- | -- | --
s | Yes |   | <empty> | Movie title to search for.
type | No | movie, series, episode | <empty> | Type of result to return.
y | No |   | <empty> | Year of release.
r | No | json, xml | json | The data type to return.
page New! | No | 1-100 | 1 | Page number to return.
callback | No |   | <empty> | JSONP callback name.
v | No |   | 1 | API version (reserved for future use).

### 요청 코드

```js
const API_URL = '...'  

async function getMoviesInfo(title, year = '', page = 1) {
  const res = await fetch(`${API_URL}&s=${title}&y=${year}&page=${page}`);
  const json = await res.json();
}
```
### 결과 예시

```json
{
  "Search": [ 
    {
      "Title": "Lauf um Dein Leben - Vom Junkie zum Ironman",
      "Year": "2008",
      "imdbID": "tt0954542",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BYzA3YjNjZDAtYWU2MC00YmIyLTkzMjEtOGE5YmIyZmYxODIzXkEyXkFqcGc@._V1_SX300.jpg"
    },
    ...
  ],
  "totalResults": "38",
  "Response": "True"
}
```

## 영화 상세 정보 요청

### 파라미터

Parameter | Required | Valid Options | Default Value | Description
-- | -- | -- | -- | --
i | Optional* |   | <empty> | A valid IMDb ID (e.g. tt1285016)
t | Optional* |   | <empty> | Movie title to search for.
type | No | movie, series, episode | <empty> | Type of result to return.
y | No |   | <empty> | Year of release.
plot | No | short, full | short | Return short or full plot.
r | No | json, xml | json | The data type to return.
callback | No |   | <empty> | JSONP callback name.
v | No |   | 1 | API version (reserved for future use).


### 요청

```js
async function getMovieDetail(imdbID) {
  const res = await fetch(`${API_URL}&i=${imdbID}`);
  const json = await res.json();
}
```

### 결과 예시

```json
{
    "Title": "Lauf um Dein Leben - Vom Junkie zum Ironman",
    "Year": "2008",
    "Rated": "N/A",
    "Released": "24 Apr 2008",
    "Runtime": "96 min",
    "Genre": "Biography, Drama, Sport",
    "Director": "Adnan Köse",
    "Writer": "Fritjof Hohagen, Adnan Köse",
    "Actors": "Max Riemelt, Jasmin Schwiers, Uwe Ochsenknecht",
    "Plot": "He lived the junkie's life as a heroin addict. Triathlon transformed him. Biopic of the record breaking Ironman Andreas Niedrig.",
    "Language": "German",
    "Country": "Germany",
    "Awards": "N/A",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYzA3YjNjZDAtYWU2MC00YmIyLTkzMjEtOGE5YmIyZmYxODIzXkEyXkFqcGc@._V1_SX300.jpg",
    "Ratings": [
        {
            "Source": "Internet Movie Database",
            "Value": "6.0/10"
        }
    ],
    "Metascore": "N/A",
    "imdbRating": "6.0",
    "imdbVotes": "265",
    "imdbID": "tt0954542",
    "Type": "movie",
    "DVD": "N/A",
    "BoxOffice": "N/A",
    "Production": "StudioCanal",
    "Website": "N/A",
    "Response": "True"
}
```