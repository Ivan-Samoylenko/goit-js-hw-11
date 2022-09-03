// imports
import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages, page, PER_PAGE } from './js/fetch.js';

// variables
let currentSearch = null;
let lightbox = null;

// references
const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtnPlace: document.querySelector('.js-load-more-btn-place'),
};

// Load more button
refs.loadMoreBtn = document.createElement('button');
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
    page = 1;
    try {
      const {
        data: { totalHits, hits },
      } = await fetchImages(currentSearch);

      if (totalHits === 0) {
        zeroMatchesMessage();
        return;
      }

      totalHitsMessage(totalHits);

      renderImages(hits);

      if (!lightbox) {
        lightbox = new SimpleLightbox('.gallery a', {
          captions: true,
          captionSelector: 'img',
          captionsData: 'alt',
          captionDelay: 250,
          alertError: false,
        });
      } else {
        lightbox.refresh();
      }

      event.target.reset();

      if (totalHits > PER_PAGE) {
        refs.loadMoreBtnPlace.append(refs.loadMoreBtn);
        page += 1;
      } else {
        noMoreImagesMessage();
        currentSearch = null;
      }
    } catch (err) {
      console.log(err.message);
      console.log(err.stack);
    }
  }
}

async function onLoadMore() {
  disableLoadMoreBtn();

  try {
    const {
      data: { totalHits, hits },
    } = await fetchImages(currentSearch);

    totalHitsMessage(totalHits);

    renderImages(hits);

    lightbox.refresh();

    if (totalHits < PER_PAGE * page) {
      refs.loadMoreBtn.remove();
      noMoreImagesMessage();
      currentSearch = null;
    }

    page += 1;

    scrollBottom();
  } catch (err) {
    console.log(err.message);
    console.log(err.stack);
  }

  enableLoadMoreBtn();
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
function totalHitsMessage(totalHits) {
  return Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}

function noMoreImagesMessage() {
  return Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
}

function zeroMatchesMessage() {
  return Notiflix.Notify.info(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

// Load more button functions
function enableLoadMoreBtn() {
  refs.loadMoreBtn.removeAttribute('disabled');
}

function disableLoadMoreBtn() {
  refs.loadMoreBtn.setAttribute('disabled', true);
}
