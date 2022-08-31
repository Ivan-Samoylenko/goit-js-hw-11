// imports
import './css/styles.css';
// import axios from 'axios';
// import Notiflix from 'notiflix';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// variables

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

// event functions
function onLoadMore() {}

// functions helpers
function createCardMarkup(card) {
  return `<a class="gallery-card" href="${card}">
            <div class="photo-card">
              <img src="${card}" alt="${card}" width="290" height="217" loading="lazy" />
              <div class="info">
                <p class="info-item"><b>Likes</b> ${card}</p>
                <p class="info-item"><b>Views</b> ${card}</p>
                <p class="info-item"><b>Comments</b> ${card}</p>
                <p class="info-item"><b>Downloads</b> ${card}</p>
              </div>
            </div>
          </a>`;
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
