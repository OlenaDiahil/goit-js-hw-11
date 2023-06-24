import { pixabayAPI } from './pixabay-api.js';
import Notiflix from 'notiflix';
import { createPhotoCards, clearGallery } from './gallery.js';

const searchForm = document.getElementById('search-form');
const loadMoreBtn = document.querySelector('.load-more');

const api = new pixabayAPI();

searchForm.addEventListener('submit', handleFormSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const searchQuery = formData.get('searchQuery');

  if (searchQuery.trim() === '') {
    return;
  }

  clearGallery();
  api.resetPage();
  api.setQuery(searchQuery);
  fetchPhotos();
}

function handleLoadMore() {
  fetchPhotos();
}

function fetchPhotos() {
  api.fetchPhotos()
    .then(({ hits, totalHits }) => {
      if (hits.length === 0) {
        showErrorNotification();
        return;
      }

      createPhotoCards(hits);

      if (api.page * api.perPage < totalHits) {
        showLoadMoreBtn();
      } else {
        hideLoadMoreBtn();
        showEndMessage();
      }

      api.incrementPage();
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function showErrorNotification() {Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
}

function showLoadMoreBtn() {
  loadMoreBtn.style.display = 'block';
}

function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
}

function showEndMessage() {
  Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
}
