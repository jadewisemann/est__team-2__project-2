import createGnb from "./@gnbModule.js";

export const setupGnbMenu = () => {
  const gnbContainer = document.querySelector(".navbar");
  gnbContainer.innerHTML = createGnb();
  const searchInput = document.querySelector(".gnb--search--input");
  const searchButton = document.querySelector(".gnb--search-button");
  const searchContainer = document.querySelector(".gnb--search--container");

  // 버튼 클릭시 인풋창 활성화
  searchButton.addEventListener("click", () => {
    searchContainer.classList.toggle("active");
    searchButton.classList.toggle("hidden");

    if (searchContainer.classList.contains("active")) {
      searchInput.focus();
    }
  });

  // 인풋창 외 클릭시 인풋창 비활성화
  document.addEventListener("click", (e) => {
    const isClickInside =
      searchContainer.contains(e.target) || searchButton.contains(e.target);

    if (!isClickInside) {
      searchContainer.classList.remove("active");
      searchButton.classList.remove("hidden");
    }
  });

  // gnb-genre 클릭 기능
  const menuButtons = {
    drama: {
      element: document.querySelector(".gnb--menu__Drama"),
      genreId: 18,
    },
    action: {
      element: document.querySelector(".gnb--menu__Action"),
      genreId: 28,
    },
    romance: {
      element: document.querySelector(".gnb--menu__Romance"),
      genreId: 10749,
    },
    thriller: {
      element: document.querySelector(".gnb--menu__Thriller"),
      genreId: 53,
    },
    horror: {
      element: document.querySelector(".gnb--menu__Horror"),
      genreId: 27,
    },
  };

  Object.entries(menuButtons).forEach(([_, { element, genreId }]) => {
    if (element) {
      element.addEventListener("click", () => {
        window.location.href = `search-result.html?genre=${genreId}`;
      });
    }
  });

  // 검색창 엔터시  검색기능

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      let searchTerm = searchInput.value.trim();
      if (searchTerm) {
        window.location.href = `search-result.html?title=${encodeURIComponent(
          searchTerm
        )}`;
      } else {
        alert("Please enter a movie title.");
      }
    }
  });
};
