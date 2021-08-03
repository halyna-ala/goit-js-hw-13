import axios from 'axios';
import Notiflix from "notiflix";


const API_URL = 'https://pixabay.com/api';
const API_KEY = '22615922-71ba88c3fd45c0bbaa03a48de';


export default class NewsApiService {
    constructor(){
        this.searchQuery = '';
        this.per_page = 40;
        this.page = 1;
        this.totalHits = 500;

    }
// export default class NewsApiService {
//     constructor(){
//         this.searchQuery = '';
//         this.page = 1;
//     }

   async fetchArticals(){
        const url = `${API_URL}/?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.per_page}`
      
     const response = await axios.get(url)
     this.incrementPage()
     return response.data.hits
        
    }

    //   fetchArticals() {
    //     return fetch(`${API_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
    //         .then(response => response.json())
    //         .then(({ total, hits }) => {
    //             if (total > 0 && this.page === 1) {
    //                 Notiflix.Notify.success(`Hooray! We found ${total} images.`);
    //             }
    //             this.page += 1;
    //             return hits;
    //         })
    // }

   

    incrementPage(){
        this.page += 1;
    }

    resetPage(){
        this.page = 1;
    }

    get query(){
        return this.searchQuery;
    }

    set query(newQuery){
        return (this.searchQuery = newQuery);
    }
}



