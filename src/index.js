import NewsApiService from './js/pixabay-service';
import articalesTpl from './templares/image.hbs';
import Notiflix from 'notiflix';

import './sass/main.css';




const refs = {
  serchForm : document.querySelector('.search-form'),
  btnLoadMore : document.querySelector('.load-more'),
  gallery : document.querySelector('.gallery'),
 submitBtn: document.querySelector('.submit-btn'),
}



refs.serchForm.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onLoardMore);

// refs.btnLoadMore.disabled = true;
// let totalpage = 0;

const newsApiService = new NewsApiService();

async function onSearch(e){
    e.preventDefault();

    // isHiddenTrue();

//   refs.btnLoadMore.disabled = false ;
    refs.btnLoadMore.classList.add('is-hidden');
    // hiddenLoadMoreBtn();
    
  newsApiService.query = e.currentTarget.elements.searchQuery.value;

  if(newsApiService.query === ''){

      return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
  newsApiService.resetPage()
    clearImageContainer();
    
  const response = await newsApiService.fetchArticals();

    return imageMarkup(response);
}

async function onLoardMore() {
    // isHiddenTrue();

    const response = await newsApiService.fetchArticals();
        return imageMarkup(response);
    }

function imageMarkup(images) {
    refs.gallery.insertAdjacentHTML('beforeend', articalesTpl(images))

    // isHiddenFolse();

    refs.btnLoadMore.classList.remove('is-hidden')
    // showLoadMoreBtn();

// refs.submitBtn.hide()

    if (images.length === 0) {
        refs.btnLoadMore.classList.add('is-hidden');

        // hiddenLoadMoreBtn();
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    if (images.length < 40) {
        refs.btnLoadMore.classList.add('is-hidden');

        // hiddenLoadMoreBtn();
        Notiflix.Notify.info('We are sorry, but you have reached the end of search results.');
    }
}

function  clearImageContainer(){
    refs.gallery.innerHTML = '';
}

// function showLoadMoreBtn() {
//     btnLoadMore.classList.remove('is-hidden')
// }

// function hiddenLoadMoreBtn() {
//     btnLoadMore.classList.add('is-hidden')
// }
