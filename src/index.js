import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

const handleLoader = () => {
  loader.style.display = 'block';
  error.style.display = 'none';
  breedSelect.disabled = true;

  fetchBreeds()
    .then(breeds => {
      loader.style.display = 'none';
      breedSelect.disabled = false;

      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });
    })
    .catch(() => {
      loader.style.display = 'none';
      error.style.display = 'block';
    });
}

document.addEventListener('DOMContentLoaded', handleLoader);

const handleChange =  () => {
  const breedId = breedSelect.value;

  loader.style.display = 'block';
  error.style.display = 'none';
  catInfo.innerHTML = '';

  fetchCatByBreed(breedId)
    .then(cat => {
      loader.style.display = 'none';

      const image = document.createElement('img');
      image.src = cat.url;
      image.alt = cat.breed.name;

      const breedName = document.createElement('p');
      breedName.textContent = `Breed: ${cat.breed.name}`;

      const description = document.createElement('p');
      description.textContent = `Description: ${cat.breed.description}`;

      const temperament = document.createElement('p');
      temperament.textContent = `Temperament: ${cat.breed.temperament}`;

      catInfo.appendChild(image);
      catInfo.appendChild(breedName);
      catInfo.appendChild(description);
      catInfo.appendChild(temperament);
    })
    .catch(() => {
      loader.style.display = 'none';
      error.style.display = 'block';
    });
}

breedSelect.addEventListener('change', handleChange);