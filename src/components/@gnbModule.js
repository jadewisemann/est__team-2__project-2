export default function createGnb() {
  return `
<div class="gnb">
    <a href="index.html">
    <div class="gnb--logo">
    <h1>
       <svg width="130" height="30" viewBox="0 0 130 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="logo">
        <g id="vide n">
        <path id="Vector" d="M110.252 10.2716C110.726 10.008 111.385 9.74445 112.229 9.48087C113.072 9.2173 114.008 8.98009 115.036 8.76923C116.064 8.53202 117.105 8.34751 118.159 8.21573C119.213 8.05759 120.175 7.97852 121.045 7.97852C122.811 7.97852 124.34 8.18937 125.631 8.61109C126.923 9.0328 127.911 9.75762 128.597 10.7856C129.308 11.8135 129.664 13.2236 129.664 15.0159V28.6162H123.141V16.5182C123.141 15.9911 123.062 15.5299 122.903 15.1345C122.772 14.7128 122.561 14.3701 122.271 14.1066C122.007 13.843 121.638 13.6453 121.164 13.5135C120.716 13.3817 120.175 13.3158 119.543 13.3158C118.989 13.3158 118.436 13.3949 117.882 13.5531C117.355 13.6848 116.986 13.8298 116.775 13.988V28.6162H110.252V10.2716Z" fill="white"/>
        <path id="Vector_2" d="M67.208 29.2092C65.1521 29.2092 63.3335 28.8006 61.752 27.9836C60.197 27.1401 58.9845 25.9541 58.1147 24.4253C57.245 22.8703 56.8101 21.0384 56.8101 18.9299C56.8101 15.4244 57.693 12.6964 59.459 10.746C61.2249 8.79553 63.7684 7.82031 67.0894 7.82031C69.3034 7.82031 71.0957 8.29474 72.4662 9.2436C73.8368 10.1925 74.8516 11.6026 75.5105 13.4739C76.1694 15.3453 76.4857 17.6384 76.4593 20.3532H61.3567L60.566 16.36H70.9243L70.1336 18.495C70.1073 16.36 69.8305 14.8709 69.3034 14.0274C68.8026 13.1576 67.9592 12.7228 66.7731 12.7228C66.1405 12.7228 65.5606 12.9073 65.0335 13.2763C64.5064 13.6189 64.0846 14.1856 63.7684 14.9763C63.4784 15.767 63.3335 16.8345 63.3335 18.1787C63.3335 19.9973 63.7552 21.3943 64.5986 22.3695C65.4684 23.3183 66.8917 23.7928 68.8685 23.7928C69.5801 23.7928 70.2918 23.7137 71.0034 23.5556C71.715 23.3711 72.374 23.1602 72.9802 22.923C73.5864 22.6858 74.1004 22.5013 74.5221 22.3695V27.9045C73.5996 28.2471 72.5453 28.5502 71.3592 28.8138C70.1995 29.0774 68.8158 29.2092 67.208 29.2092Z" fill="white"/>
        <path id="Vector_3" d="M44.9812 29.2093C43.2943 29.2093 41.7788 29.0248 40.4346 28.6558C39.0904 28.3131 37.9306 27.7333 36.9554 26.9162C36.0066 26.0991 35.2686 25.0053 34.7414 23.6347C34.2406 22.2378 33.9902 20.4982 33.9902 18.416C33.9902 15.1477 34.7941 12.5647 36.4019 10.667C38.0097 8.76927 40.4346 7.82041 43.6765 7.82041C44.0455 7.82041 44.5595 7.85995 45.2184 7.93902C45.8773 7.99173 46.5758 8.14988 47.3138 8.41345C48.0518 8.67702 48.7239 9.15145 49.3301 9.83674L48.1045 11.8926V0.348145H54.5488V23.0417C54.5488 24.0433 54.2853 24.9394 53.7581 25.7301C53.2573 26.4945 52.5589 27.1402 51.6627 27.6674C50.7666 28.1682 49.7387 28.5503 48.5789 28.8139C47.4456 29.0775 46.2463 29.2093 44.9812 29.2093ZM45.2579 23.7929C46.1277 23.7929 46.813 23.6743 47.3138 23.4371C47.8409 23.1998 48.1045 22.8308 48.1045 22.3301V13.7903C47.6828 13.5531 47.2347 13.3818 46.7603 13.2764C46.3122 13.1446 45.8773 13.0787 45.4556 13.0787C44.4013 13.0787 43.5052 13.2368 42.7672 13.5531C42.0292 13.8694 41.4757 14.4361 41.1067 15.2531C40.7377 16.0439 40.5532 17.1772 40.5532 18.6532C40.5532 19.7602 40.7113 20.6959 41.0276 21.4603C41.3439 22.2246 41.8447 22.8045 42.53 23.1998C43.2416 23.5952 44.1509 23.7929 45.2579 23.7929Z" fill="white"/>
        <path id="Vector_4" d="M25.0986 28.6165V8.88818H31.6616L31.7011 28.6165H25.0986Z" fill="white"/>
        <path id="Vector_5" d="M8.34206 28.6164L0 8.57178H7.07691L12.9282 23.5954H11.3072L16.2888 8.57178H23.2471L14.905 28.6164H8.34206Z" fill="white"/>
        </g>
        <path id="Exclude" fill-rule="evenodd" clip-rule="evenodd" d="M93.2017 30C101.486 30 108.202 23.2843 108.202 15C108.202 6.71573 101.486 0 93.2017 0C84.9174 0 78.2017 6.71573 78.2017 15C78.2017 23.2843 84.9174 30 93.2017 30ZM101.739 16.8917C103.072 16.1219 103.072 14.1974 101.739 13.4276L90.5121 6.94575C89.1788 6.17595 87.5121 7.1382 87.5121 8.6778L87.5121 21.6414C87.5121 23.181 89.1788 24.1433 90.5121 23.3735L101.739 16.8917Z" fill="white"/>
        </g>
        </svg>
        </h1>
    </a>    
    </div>  
    <ul class="gnb--menu">
        <li class="gnb--menu__Drama">Drama</li>
        <li class="gnb--menu__Action">Action</li>
        <li class="gnb--menu__Romance">Romance</li>
        <li class="gnb--menu__Thriller">Thriller</li>
        <li class="gnb--menu__Horror">Horror</li>
    </ul>
    
    <div class="gnb--search">
        
        <button class="gnb--search-button">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path id="Vector" d="M22 20.8461L15.8547 14.7017C17.3314 12.9291 18.0678 10.6555 17.9107 8.35387C17.7536 6.05222 16.715 3.89975 15.011 2.34423C13.307 0.788714 11.0689 -0.0500902 8.76209 0.00231568C6.45532 0.0547216 4.25756 0.994303 2.62601 2.6256C0.994459 4.2569 0.0547302 6.45431 0.00231604 8.76072C-0.0500981 11.0671 0.788838 13.3049 2.3446 15.0087C3.90036 16.7124 6.05317 17.7508 8.35518 17.9079C10.6572 18.065 12.9312 17.3287 14.704 15.8522L20.8494 21.9965L22 20.8461ZM1.65657 8.9788C1.65657 7.53055 2.0861 6.11482 2.89083 4.91064C3.69556 3.70647 4.83935 2.76793 6.17757 2.2137C7.51579 1.65948 8.98833 1.51447 10.409 1.79701C11.8296 2.07955 13.1346 2.77695 14.1588 3.80102C15.183 4.82509 15.8805 6.12983 16.1631 7.55025C16.4457 8.97068 16.3007 10.443 15.7464 11.781C15.1921 13.119 14.2534 14.2626 13.049 15.0672C11.8446 15.8718 10.4287 16.3013 8.98021 16.3013C7.03852 16.2991 5.17698 15.527 3.80399 14.1542C2.43101 12.7814 1.65873 10.9202 1.65657 8.9788Z" fill="white"/>
                </svg>
        </button>
        <div class="gnb--search--container">
           <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path id="Vector" d="M22 20.8461L15.8547 14.7017C17.3314 12.9291 18.0678 10.6555 17.9107 8.35387C17.7536 6.05222 16.715 3.89975 15.011 2.34423C13.307 0.788714 11.0689 -0.0500902 8.76209 0.00231568C6.45532 0.0547216 4.25756 0.994303 2.62601 2.6256C0.994459 4.2569 0.0547302 6.45431 0.00231604 8.76072C-0.0500981 11.0671 0.788838 13.3049 2.3446 15.0087C3.90036 16.7124 6.05317 17.7508 8.35518 17.9079C10.6572 18.065 12.9312 17.3287 14.704 15.8522L20.8494 21.9965L22 20.8461ZM1.65657 8.9788C1.65657 7.53055 2.0861 6.11482 2.89083 4.91064C3.69556 3.70647 4.83935 2.76793 6.17757 2.2137C7.51579 1.65948 8.98833 1.51447 10.409 1.79701C11.8296 2.07955 13.1346 2.77695 14.1588 3.80102C15.183 4.82509 15.8805 6.12983 16.1631 7.55025C16.4457 8.97068 16.3007 10.443 15.7464 11.781C15.1921 13.119 14.2534 14.2626 13.049 15.0672C11.8446 15.8718 10.4287 16.3013 8.98021 16.3013C7.03852 16.2991 5.17698 15.527 3.80399 14.1542C2.43101 12.7814 1.65873 10.9202 1.65657 8.9788Z" fill="white"/>
                </svg>
            <input type="text" autocomplete="off" class="gnb--search--input" name="Search" placeholder=" Search by title">
        </div>
    </div>
</div>

  `;
}
