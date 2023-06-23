const apiKey = 'live_qCCV75PD4nB6ILaYLQt5QeayrzvJjby7WXjsqUyXavybS0atozTkxoDsxnKeYc95';

export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';

  return fetch(url, {
    headers: {
      'x-api-key': apiKey
    }
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      throw new Error(`Failed to fetch breeds: ${error.message}`);
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return fetch(url, {
    headers: {
      'x-api-key': apiKey
    }
  })
    .then(response => response.json())
    .then(data => {
      const cat = data[0];
      return {
        url: cat.url,
        breed: cat.breeds[0]
      };
    })
    .catch(error => {
      throw new Error(`Failed to fetch cat: ${error.message}`);
    });
}