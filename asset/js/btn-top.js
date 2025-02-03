
document.addEventListener('DOMContentLoaded', function() {
    const btnTop = document.querySelector('.btn-top')

      window.addEventListener('scroll', function() {
          // 현재 스크롤 위치 가져오기
          let scrollY = window.scrollY || document.documentElement.scrollTop;
          let showThreshold = window.innerHeight / 2; // 화면 높이의 절반 이하일 때 숨김
          
          if (scrollY > showThreshold) {
              btnTop.style.opacity = '1';
              btnTop.style.visibility = 'visible';
          } else {
              btnTop.style.opacity = '0';
              btnTop.style.visibility = 'hidden';
          }
      });

      // 버튼 클릭 시 부드럽게 맨 위로 이동
      btnTop.addEventListener('click', function() {
          window.scrollTo({
              top: 0,
              behavior: 'smooth'
          });
      });
  });