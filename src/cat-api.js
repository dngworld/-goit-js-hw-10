// import axios from 'axios';
// axios.defaults.headers.common['x-api-key'] =
//   'live_2tNrx7o9SIUIF4HVTOZ1oReiU6fDyFEpWixRHSIKJAY7cl5MBa0QmhWZtQEVCFxJ';
// axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

// export function fetchBreeds() {
//   return axios.get('/breeds').then(response => {
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//     return response.json();
//   });
// }

// export function fetchCatByBreed(breedId) {
//   return axios.get(`/images/search?breed_ids=${breedId}`).then(response => {
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//     return response.json();
//   });
// }
const URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_2tNrx7o9SIUIF4HVTOZ1oReiU6fDyFEpWixRHSIKJAY7cl5MBa0QmhWZtQEVCFxJ';

export function fetchBreeds() {
  return fetch(`${URL}/breeds?api_key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `${URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
