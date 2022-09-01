// imports
import './css/styles.css';
// import axios from 'axios';
// import Notiflix from 'notiflix';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages, fetchMoreImages, page, PER_PAGE } from './js/fetch.js';

// variables
let currentSearch = null;
let totalImages = null;

// references
const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtnPlace: document.querySelector('.js-load-more-btn-place'),
  loadMoreBtn: document.createElement('button'),
};

// Load more button
refs.loadMoreBtn.setAttribute('type', 'button');
refs.loadMoreBtn.classList.add('load-more');
refs.loadMoreBtn.textContent = 'Load more';

// event listeners
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.searchForm.addEventListener('submit', onQuerySubmit);

// event functions
async function onQuerySubmit(event) {
  event.preventDefault();

  resetImages();

  currentSearch = event.target.elements.searchQuery.value.trim();
  if (currentSearch) {
    const { total, hits } = await fetchImages(currentSearch);

    renderImages(hits);

    event.target.reset();

    const maxPage = total / PER_PAGE;
    if (maxPage > page) {
      refs.loadMoreBtnPlace.append(refs.loadMoreBtn);
    } else {
      noMoreImages();
      currentSearch = null;
    }
  }
}

async function onLoadMore() {
  const { total, hits } = await fetchMoreImages(currentSearch);

  renderImages(hits);

  const maxPage = total / PER_PAGE;
  if (maxPage < page) {
    refs.loadMoreBtn.remove();
    noMoreImages();
    currentSearch = null;
  }
}

// functions helpers
function createCardMarkup({
  comments,
  views,
  largeImageURL,
  webformatURL,
  likes,
  downloads,
  tags,
}) {
  return `<a class="gallery-card" href="${largeImageURL}">
            <div class="photo-card">
              <img src="${webformatURL}" alt="${tags}" width="290" height="217" loading="lazy" />
              <div class="info">
                <p class="info-item"><b>Likes</b> ${likes}</p>
                <p class="info-item"><b>Views</b> ${views}</p>
                <p class="info-item"><b>Comments</b> ${comments}</p>
                <p class="info-item"><b>Downloads</b> ${downloads}</p>
              </div>
            </div>
          </a>`;
}

function createOnePageMurkup(cards) {
  return cards.reduce((acc, card) => {
    return acc + createCardMarkup(card);
  }, '');
}

function renderImages(cards) {
  const markup = createOnePageMurkup(cards);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function resetImages() {
  refs.gallery.innerHTML = '';
}

function scrollBottom() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

// messages
function noMoreImages() {}
