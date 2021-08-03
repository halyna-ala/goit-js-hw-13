import NewsApiService from './js/pixabay-service';
import articalesTpl from './templares/image.hbs';
import Notiflix from 'notiflix';

import './sass/main.css';




const refs = {
  serchForm : document.querySelector('.search-form'),
  btnLoadMore : document.querySelector('.load-more'),
  gallery : document.querySelector('.gallery'),
// submitBtn: document.querySelector('.submit-btn'),
}



refs.serchForm.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onLoardMore);

// refs.btnLoadMore.disabled = true;
// let totalpage = 0;

const newsApiService = new NewsApiService();

async function onSearch(e){
    e.preventDefault();
    
    hiddenLoadMoreBtn();

  newsApiService.query = e.currentTarget.elements.searchQuery.value;

  if(newsApiService.query === ''){

      return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
  newsApiService.resetPage()
  clearImageContainer();

    const response = await newsApiService.fetchArticals();
  return await imageMarkup(response);




}

async function onLoardMore(){
    const response = await newsApiService.fetchArticals() 
        return imageMarkup(response);
    }

function imageMarkup(images) {
    refs.gallery.insertAdjacentHTML('beforeend', articalesTpl(images))

    showLoadMoreBtn();

    // refs.submitBtn.hide()

    if (images.length === 0) {
        hiddenLoadMoreBtn();

        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    if (images.length < 40) {
        hiddenLoadMoreBtn();
        
        Notiflix.Notify.info('We are sorry, but you have reached the end of search results.');
    }
}

function  clearImageContainer(){
    refs.gallery.innerHTML = '';
}


function showLoadMoreBtn() {
    btnLoadMore.classList.remove('is-hidden')
}

function hiddenLoadMoreBtn() {
    btnLoadMore.classList.add('is-hidden')
}