import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const elements = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

elements.breedSelect.addEventListener('change', onSelect);
elements.error.classList.add('is-hidden');

function onSelect(event) {
  event.preventDefault();
  elements.loader.classList.remove('is-hidden');
  fetchCatByBreed(event.target.value)
    .then(elem => {
      elements.catInfo.innerHTML = createMarkupCard(elem);
    })
    .catch(function (error) {
      Notiflix.Notify.failure(error);
    })
    .finally(() => {
      elements.loader.classList.add('is-hidden');
    });
}

function createList(arr) {
  return arr
    .map(
      ({ id, name }) => `
      <option class="cats" value="${id}">${name}</option>
      `
    )
    .join('');
}

function createMarkupCard(arr) {
  const { breeds, url } = arr.data[0];
  const { name, temperament, description } = breeds[0];
  return `
  <img src="${url}" alt="${name}" width="450">
  <div class="descr">
  <h2>${name}</h2>
  <p>${description}</p>
  <p><b>Temperament:</b> ${temperament}</p>
  </div>
  `;
}

fetchBreeds()
  .then(elem => {
    elements.loader.classList.add('is-hidden'),
      elements.breedSelect.insertAdjacentHTML(
        'afterbegin',
        createList(elem.data)
      ),
      elements.loader.classList.add('is-hidden'),
      new SlimSelect({ select: '#single' });
  })
  .catch(function (error) {
    Notiflix.Notify.failure(error);
  });
