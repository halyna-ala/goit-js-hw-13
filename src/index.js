import NewsApiService from './js/pixabay-service';
import articalesTpl from './templares/image.hbs';
import Notiflix from 'notiflix';

import './sass/main.css';




const refs = {
  serchForm : document.querySelector('.search-form'),
  btnLoadMore : document.querySelector('.load-more'),
  gallery : document.querySelector('.gallery'),

}



refs.serchForm.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onLoardMore);

// refs.btnLoadMore.disabled = true;
// let totalpage = 0;

const newsApiService = new NewsApiService();

async function onSearch(e){
  e.preventDefault();
  refs.btnLoadMore.disabled = false ;

  newsApiService.query = e.currentTarget.elements.searchQuery.value;

  if(newsApiService.query === ''){

      return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
  newsApiService.resetPage()
  const response = await newsApiService.fetchArticals();
    clearImageContainer();

    return await imageMarkup(response);
}

async function onLoardMore(){
    const response = await newsApiService.fetchArticals() 
        return imageMarkup(response);
    }

function imageMarkup(images) {
    refs.gallery.insertAdjacentHTML('beforeend', articalesTpl(images))
    refs.btnLoadMore.classList.remove('is-hidden')
    if (images.length === 0) {
        refs.btnLoadMore.classList.add('is-hidden')
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    if (images.length < 40) {
        refs.btnLoadMore.classList.add('is-hidden')
        Notiflix.Notify.info('We are sorry, but you have reached the end of search results.');
    }
}

function  clearImageContainer(){
    refs.gallery.innerHTML = '';
}


