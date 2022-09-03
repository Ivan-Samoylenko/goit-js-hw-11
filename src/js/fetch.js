// imports
import axios from 'axios';
import { page } from '../index.js';

// variables
const URL = 'https://pixabay.com/api/';
const KEY = '29632331-970c63df483138173fd88b904';
const IMAGE_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const SAFESEARCH = 'true';
const PER_PAGE = 40;

// functions
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

  if (response.status === 200) {
    return response;
  }

  throw new Error('404');
}

// exports
export { fetchImages, PER_PAGE };
