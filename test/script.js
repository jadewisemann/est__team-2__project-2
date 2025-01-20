document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.gnb--search--input');
    const searchButton = document.querySelector('.gnb--search-button');
    const searchContainer = document.querySelector('.gnb--search--container');
  
    if (searchButton && searchInput && searchContainer) {
      searchButton.addEventListener('click', () => {
        searchContainer.classList.toggle('active');
        searchButton.classList.toggle('hidden');
    
        if (searchContainer.classList.contains('active')) {
          searchInput.focus();
        }
      });
  
      document.addEventListener('click', (e) => {
        const isClickInside =
        searchContainer.contains(e.target) || searchButton.contains(e.target);
  
        if (!isClickInside) {
          searchContainer.classList.remove('active');
          searchButton.classList.remove('hidden');
        }
      });
    }
  });