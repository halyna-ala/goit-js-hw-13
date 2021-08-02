// import NewsApiService from './js/pixabay-service';
// import articalesTpl from './templares/image.hbs';
import newsApiService from './js/pixabay-service';
// import BtnLoadMore from './js/lead-more-btn';
import imagesTpl from './templares/image.hbs';
import Notiflix from 'notiflix';

import './sass/main.css';

 
const refs = {
    searchForm: document.querySelector('.search-form'),
    cardGallery: document.querySelector('.gallery'),
    loadMoreButton: document.querySelector('.load-more'),
    submitBtn: document.querySelector('.submit-btn'),
}

refs.searchForm.addEventListener('submit', onSearch)
refs.loadMoreButton.addEventListener('click', loadMore)

const newImageService = new newsApiService();

async function onSearch(e) {
    e.preventDefault();

    newImageService.query = e.currentTarget.elements.query.value;

    if (newImageService.query === '') {
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    
    newImageService.resetPage();
    const response = await newImageService.fetchImages();
    clearImageContainer();

    
    return await imageMarkup(response);
}

async function loadMore() {
    const response = await newImageService.fetchImages();
    return imageMarkup(response);
}

function imageMarkup(images) {
    refs.cardGallery.insertAdjacentHTML('beforeend', imagesTpl(images))
    refs.loadMoreButton.classList.remove('is-hidden')

    // refs.submitBtn.hide()
     

    if (images.length === 0) {
        refs.loadMoreButton.classList.add('is-hidden')
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }

    if (images.length < 40) {
        refs.loadMoreButton.classList.add('is-hidden')
        Notiflix.Notify.info('We are sorry, but you have reached the end of search results.');
    }
}

function clearImageContainer() {
    refs.cardGallery.innerHTML = '';
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

