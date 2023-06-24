import axios from 'axios';

export class pixabayAPI {
  #BASE_URL = 'https://pixabay.com';
  #API_KEY = '37752238-a4c546d1d3d991ecad223b19f';

  page = 1;
  perPage = 40;
  query = null;

  fetchPhotos() {
    const url = `${this.#BASE_URL}/api/`;
    const params = {
      q: this.query,
      page: this.page,
      per_page: this.perPage,
      key: this.#API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    };

    return axios.get(url, { params })
      .then(response => {
        const { data } = response;
        return {
          hits: data.hits,
          totalHits: data.totalHits,
        };
      });
  }

  setQuery(query) {
    this.query = query;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}