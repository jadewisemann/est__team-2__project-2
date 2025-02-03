window.addEventListener('DOMContentLoaded', function(){
    this.setTimeout(function(){
        const swiperWrappers = document.querySelectorAll('.swiper-wrapper')

        swiperWrappers.forEach((swiperWrapper, index) => {
            
            const parent = swiperWrapper.parentElement; // 부모 요소 찾기
            const prevButton = parent.querySelector('.swiper-button-prev')
            const nextButton = parent.querySelector('.swiper-button-next')
            
            // 버튼이 없는 경우 건너뜀
            if (!nextButton || !prevButton) {
                console.warn(`Buttons not found for swiper-wrapper ${index + 1}`)
                return;
            }

            // 버튼 초기 상태 설정
            nextButton.style.right = '-60px'
            prevButton.style.left = '-60px'
    
            // 마우스 오버 시 버튼 나타나기
            swiperWrapper.addEventListener('mouseenter', () => {
                nextButton.style.right = '0' // 버튼 보이기
                prevButton.style.left = '0' // 버튼 보이기
            });
    
            // 마우스 아웃 시 버튼 숨기기
            swiperWrapper.addEventListener('mouseleave', () => {
                nextButton.style.right = '-60px' // 버튼 숨기기
                prevButton.style.left = '-60px' // 버튼 숨기기
            });
    
            // 버튼에 마우스가 올라갔을 때 상태 유지
            nextButton.addEventListener('mouseenter', () => {
                nextButton.style.right = '0' // 버튼 상태 유지
            });
            prevButton.addEventListener('mouseenter', () => {
                prevButton.style.left = '0' // 버튼 상태 유지
            });
    
            // 버튼에서 마우스가 나갔을 때 부모 이벤트로 복귀
            nextButton.addEventListener('mouseleave', () => {
                nextButton.style.right = '-60px'
            });
            prevButton.addEventListener('mouseleave', () => {
                prevButton.style.left = '-60px'
            });
        })
    },1000)
});
