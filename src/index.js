// import NewsApiService from './js/pixabay-service';
// import articalesTpl from './templares/image.hbs';
import fetchImageApi from './js/pixabay-service';
// import BtnLoadMore from './js/lead-more-btn';
import photoCardTpl from './templares/image.hbs';
import Notiflix from 'notiflix';

import './sass/main.css';

 
const searchForm = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', onSearchForm);
loadMoreBtn.addEventListener('click', onLoadMoreBtn);

const newFetchImageApi = new fetchImageApi();

async function onSearchForm(evt) {
    evt.preventDefault();

    hiddenLoadMoreBtn();
   
    newFetchImageApi.query = evt.currentTarget.elements.searchQuery.value;

    if (newFetchImageApi.query === '') {
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }

    newFetchImageApi.resetPage();
    clearGalleryContainer();

    const response = await newFetchImageApi.fetchImages();
    return photoCardMarkup(response);
}

async function onLoadMoreBtn() {
    const response = await newFetchImageApi.fetchImages();
    return photoCardMarkup(response); 
}

function photoCardMarkup(images) {
    
    galleryContainer.insertAdjacentHTML('beforeend', photoCardTpl(images))

    showLoadMoreBtn();

    if (images.length === 0) {
        hiddenLoadMoreBtn();
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }

    if (images.length < 40) {
        hiddenLoadMoreBtn();
        Notiflix.Notify.info('We are sorry, but you have reached the end of search results.');
    }
}

function clearGalleryContainer() {
    galleryContainer.innerHTML = '';
}

function showLoadMoreBtn() {
    loadMoreBtn.classList.remove('is-hidden')
}

function hiddenLoadMoreBtn() {
    loadMoreBtn.classList.add('is-hidden')
}

// const refs = {
//   serchForm : document.querySelector('#search-form'),
//   btnLoadMore : document.querySelector('.load-more'),
//   gallery : document.querySelector('.gallery'),
//   submitBtn: document.querySelector('.submit-btn'),
// }



// // const btnLoadMore = new BtnLoadMore(

// //     {
// //     selector: '[data-action="btn"]',
// //     hidden: true,
// //     }
// //     );
// //     console.log(btnLoadMore);


// refs.serchForm.addEventListener('submit', onSearch);
// refs.btnLoadMore.addEventListener('click', onLoardMore);
// // refs.button.btnLoadMore.addEventListener('click', onLoardMore);

// const newsApiService = new NewsApiService();

// // refs.btnLoadMore.disabled = true;
// // let totalpage = 0;


// async function onSearch(e){
//   e.preventDefault();
  
//     newsApiService.query = e.currentTarget.elements.query.value;
    
//   if(newsApiService.query === ''){
      
//       return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//   }
//   newsApiService.resetPage()
//     const response = await newsApiService.fetchArticals();
//     clearGallery();

//     return await imageMarkup(response);
    

// }

 
// async function onLoardMore(){
//     const response = await newsApiService.fetchArticals() 
//         return imageMarkup(response);
//     }

// function imageMarkup(images) {
//     refs.gallery.insertAdjacentHTML('beforeend', articalesTpl(images))
//     refs.btnLoadMore.classList.remove('is-hidden')
//     refs.submitBtn.hide()

//     if (images.length === 0) {
//         refs.btnLoadMore.classList.add('is-hidden')
//          return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//     }
//     if (images.length < 40) {
//         refs.btnLoadMore.classList.add('is-hidden')
//         Notiflix.Notify.info('We are sorry, but you have reached the end of search results.');
//     }
//     }



// function clearGallery(){
//     refs.gallery.innerHTML = ''
// }

