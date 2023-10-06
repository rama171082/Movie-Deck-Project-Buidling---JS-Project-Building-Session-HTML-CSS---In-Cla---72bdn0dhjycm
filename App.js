const card = document.getElementById("movie-card");
console.log(card);
var currPage = 1;
var movie=[];
var favMovies=[];
var favMoviesId=[];
const currentPageBtn = document.getElementById("current");
currentPageBtn.innerHTML = `Current Page: ${currPage}`;
async function movieList(page){
const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=${page}`);
const data = await response.json();
movie = data.results;
console.log(currPage);
fetchMovies(movie);
}
function fetchMovies(movies){
    prevPage.disabled = currPage === 1;
    nextPage.disabled = currPage === 3;
        card.innerHTML="";
        movies.forEach((element) => {       
        const list = document.createElement("li");
        list.classList.add("movie-list");
        const imgUrl = `https://image.tmdb.org/t/p/original/${element.poster_path}`;
        list.innerHTML  = `
                          <img src= "${imgUrl}"/>
                          <h3>${element.title || "movie-title"}</h3>
                          <button class="heart-button" id ="heart-icon" data-id ="${element.id}">&#10084
                          </button>
                           <p>Votes:${element.vote_count || "vote-count"}</p>
                           <p>Rating:${element.vote_average || "vote-average"}</P>
                           `;                                                 
                           const heartIcon = list.querySelector('#heart-icon');
                            let fav = true;
                             heartIcon.addEventListener("click", ()=>{
                                if(fav){
                                    heartIcon.style.color = 'red';
                                    saveToFavourites(heartIcon.getAttribute("data-id"));
                                }
                                else {
                                    heartIcon.style.color = '';
                                    removeFromFav(heartIcon.getAttribute("data-id"));
                                }

                                fav = !fav;

                                });                               
                                
                                                             
                           card.appendChild(list);
                           
    });  
   
      
}

function fetchFavMovies(movies){
    card.innerHTML="";
    movies.forEach((element) => {
        const list = document.createElement("li");
    list.classList.add("movie-list");
    const imgUrl = `https://image.tmdb.org/t/p/original/${element.poster_path}`;
    list.innerHTML  = `
                      <img src= "${imgUrl}"/>
                      <h3>${element.title || "movie-title"}</h3>
                      <button class="heart-button" id ="heart-icon" data-id ="${element.id}">&#10084
                      </button>
                       <p>Votes:${element.vote_count || "vote-count"}</p>
                       <p>Rating:${element.vote_average || "vote-average"}</P>
                       `;
                       list.querySelector("#heart-icon").style.color ="red";
                       card.appendChild(list);
                           
    });  
}
  function saveToFavourites(mId){   
   movie.forEach((ele)=>{
    if(ele.id == mId){   
    if(!favMovies.some((mov)=>mov.id == mId)){
          favMovies.push(ele);          
    }
   }
})   
    localStorage.setItem("favourites",JSON.stringify(favMovies));

}

function removeFromFav(mId){
    for(let i=0;i<favMovies.length;i++){
        if(favMovies[i].id == mId){
            favMovies.splice(i,1);
            break;
        }
    }
    localStorage.setItem("favourites",JSON.stringify(favMovies));  
}

function sortByDate(){
    movie.sort(function(a,b){
    let ad = new Date(a.release_date);
    let bd = new Date(b.release_date);
    return ad-bd});
   fetchMovies(movie);
}
function sortByRating(){
    
    movie.sort(function(a,b)
    {return a.vote_average - b.vote_average});
    
    fetchMovies(movie);
}
function dispFavorite(){
    const favMov = localStorage.getItem("favourites");   
   favMovies = JSON.parse(favMov);
    fetchFavMovies(favMovies);     
}

function dispAll(){     
    fetchMovies(movie);    
}

const prevPage = document.querySelector(".prevBtn");
console.log(prevPage);


prevPage.addEventListener("click", ()=>{
    pagination("Previous")
});
const nextPage = document.querySelector(".nextBtn");
console.log(nextPage);


nextPage.addEventListener("click", ()=>{
    pagination("Next")
});

function pagination(selPage){
    console.log(selPage);
if(selPage == "Next" && currPage < 3){
    currPage++;
    console.log(currPage);

currentPageBtn.innerHTML = `Current Page: ${currPage}`;
movieList(currPage);
}
else if(selPage == "Previous" && currPage > 1 ){
currPage--;
console.log(currPage);
currentPageBtn.innerHTML = `Current Page: ${currPage}`;
movieList(currPage);
}
}
document.getElementById("movie-name").addEventListener("input", (event)=> {
    const searchWord = event.target.value.toLowerCase();
   
    const searchedMovie = movie.filter(movies=>
        movies.title.toLowerCase().includes(searchWord)
    );
    
    document.getElementById("searchBtn").addEventListener("click",()=>{
        fetchMovies(searchedMovie);
    });    
})

movieList(currPage);