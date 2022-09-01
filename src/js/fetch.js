import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const KEY = '29632331-970c63df483138173fd88b904';
const IMAGE_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const SAFESEARCH = 'true';
const PER_PAGE = 36;

let page = 1;

async function fetchImagesFirstTime(querry) {
  page = 1;
  return fetchImages(querry);
}

async function fetchImages(querry) {
  const response = await axios.get(URL, {
    params: {
      key: KEY,
      image_type: IMAGE_TYPE,
      orientation: ORIENTATION,
      safesearch: SAFESEARCH,
      per_page: PER_PAGE,
      q: `${querry}`,
      page: `${page}`,
    },
  });
  console.log(response);
  if (response.status === 200) {
    page += 1;
    return response;
  }

  throw new Error('404');
}

export { fetchImagesFirstTime, fetchImages, page, PER_PAGE };

fetchImages('dog');
