const URL = 'https://pixabay.com/api/';
const KEY = '29632331-970c63df483138173fd88b904';
const IMAGE_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const SAFESEARCH = 'true';
const PER_PAGE = 12;

let page = 1;

const path = `${URL}?key=${KEY}&image_type=${IMAGE_TYPE}&orientation=${ORIENTATION}&safesearch=${SAFESEARCH}&per_page=${PER_PAGE}`;

async function fetchImages(querry) {
  page = 1;
  return fetchMoreImages(querry);
}

async function fetchMoreImages(querry) {
  const response = await fetch(`${path}&q=${querry}&page=${page}`);
  page += 1;
  return await response.json();
}

export { fetchImages, fetchMoreImages, page, PER_PAGE };
