// imports
import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// variables
let cardHeight = null;

// functions helpers

function getCardHeight() {
  return ({ height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect());
}

function scrollBottom() {
  if (!cardHeight) {
    cardHeight = getCardHeight();
  }
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
