const search =  document.querySelector('.search');
const searchButton =  document.querySelector('.search-button');

searchButton.addEventListener('click', ()=>{
  const title  = search.value.trim();
  if (title)  {
    window.location.href = `search-result.html?title=${title}`;
    // window.location.href = `search-result.html?title=${encodeURIComponent(title)}`;
  } else {
    alert('영화 제목을 입력하세요.')
  };
})