import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elements = {
  catSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

const { catSelect, catInfo, loader, error } = elements;

// loader.classList.replace('loader', 'is-hidden');
// error.classList.add('is-hidden');
catInfo.classList.add('is-hidden');

catSelect.addEventListener('change', handlerSelect);

updateSelect();

function updateSelect(data) {
  // loader.classList.remove('loader', 'is-hidden');
  fetchBreeds(data)
    .then(data => {
      loader.classList.replace('loader', 'is-hidden');

      let markSelect = data.map(({ name, id }) => {
        return `<option value ='${id}'>${name}</option>`;
      });
      catSelect.insertAdjacentHTML('beforeend', markSelect);
      new SlimSelect({
        select: catSelect,
      });
    })
    .catch(onFetchError);
}

function handlerSelect(event) {
  loader.classList.replace('is-hidden', 'loader');
  catSelect.classList.add('is-hidden');
  catInfo.classList.add('is-hidden');

  const breedId = event.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(data => {
      loader.classList.replace('loader', 'is-hidden');
      catSelect.classList.remove('is-hidden');
      const { url, breeds } = data[0];

      catInfo.innerHTML = `<img src="${url}" alt="${breeds[0].name}" width="400"/>
      <div class="box"><h2>${breeds[0].name}</h2><p>${breeds[0].description}</p>
      <p><strong>Temperament:</strong> ${breeds[0].temperament}</p>
      </div>`;
      catInfo.classList.remove('is-hidden');
    })
    .catch(onFetchError);
}

function onFetchError() {
  catSelect.classList.remove('is-hidden');
  loader.classList.replace('loader', 'is-hidden');

  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!'
  );
}
