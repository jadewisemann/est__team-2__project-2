
export default function createNavbar() {
  return `
<div class="gnb">
    <a href="">
    <div class="gnb--logo">
    <h1>
        <a href='#'>
        <img src="images/logo.svg" alt="">
        </a>
        </h1>
    </a>    
    </div>  
    <ul class="gnb--menu">
        <li><a href="#">Drama</a></li>
        <li><a href="#">Action</a></li>
        <li><a href="#">Romance</a></li>
        <li><a href="#">Thriller</a></li>
        <li><a href="#">Horror</a></li>
    </ul>
    <div class="gnb--search">
        
        <button class="gnb--search-button">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path id="Vector" d="M22 20.8461L15.8547 14.7017C17.3314 12.9291 18.0678 10.6555 17.9107 8.35387C17.7536 6.05222 16.715 3.89975 15.011 2.34423C13.307 0.788714 11.0689 -0.0500902 8.76209 0.00231568C6.45532 0.0547216 4.25756 0.994303 2.62601 2.6256C0.994459 4.2569 0.0547302 6.45431 0.00231604 8.76072C-0.0500981 11.0671 0.788838 13.3049 2.3446 15.0087C3.90036 16.7124 6.05317 17.7508 8.35518 17.9079C10.6572 18.065 12.9312 17.3287 14.704 15.8522L20.8494 21.9965L22 20.8461ZM1.65657 8.9788C1.65657 7.53055 2.0861 6.11482 2.89083 4.91064C3.69556 3.70647 4.83935 2.76793 6.17757 2.2137C7.51579 1.65948 8.98833 1.51447 10.409 1.79701C11.8296 2.07955 13.1346 2.77695 14.1588 3.80102C15.183 4.82509 15.8805 6.12983 16.1631 7.55025C16.4457 8.97068 16.3007 10.443 15.7464 11.781C15.1921 13.119 14.2534 14.2626 13.049 15.0672C11.8446 15.8718 10.4287 16.3013 8.98021 16.3013C7.03852 16.2991 5.17698 15.527 3.80399 14.1542C2.43101 12.7814 1.65873 10.9202 1.65657 8.9788Z" fill="white"/>
                </svg>
        </button>
        <div class="gnb--search--container">
            <img src="./images/vector.svg" alt="">
            <input type="text" class="gnb--search--input" name="Search" placeholder="Search by title, genre, or actor">
        </div>
    </div>
</div>

  `;
}



