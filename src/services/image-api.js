export default function fetchImages(query, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '?key=35585241-0d017fc6894dff5aad1093c8d';
  const searchParams = 'image_type=photo&orientation=horizontal&per_page=12';

  return fetch(
    `${BASE_URL}${API_KEY}&q=${query}&page=${page}&${searchParams}`
  ).then(response => response.json());
}





