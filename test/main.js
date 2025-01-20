import createNavbar from './gnb.js';
import createBtnTop from './btn-top.js';
document.addEventListener('DOMContentLoaded', () => {
  const navbarContainer = document.querySelector('.navbar');
  navbarContainer.innerHTML = createNavbar(); 


  const BtnTop =document.querySelector('.btn-top')
  BtnTop.innerHTML=createBtnTop()


  //서치 버튼 영역
  const searchInput = document.querySelector('.gnb--search--input');
  const searchButton = document.querySelector('.gnb--search-button');
  const searchContainer = document.querySelector('.gnb--search--container');



    searchButton.addEventListener('click', () => {
      searchContainer.classList.toggle('active');
      searchButton.classList.toggle('hidden');
    
      if (searchContainer.classList.contains('active')) {
        searchInput.focus();
      }
    });
  
    document.addEventListener('click', (e) => {
      const isClickInside = searchContainer.contains(e.target) || searchButton.contains(e.target);
  
      if (!isClickInside) {
        searchContainer.classList.remove('active');
        searchButton.classList.remove('hidden');
      }
    });
  

   
});

