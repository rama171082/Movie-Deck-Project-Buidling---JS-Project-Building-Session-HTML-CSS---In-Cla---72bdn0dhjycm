const card = document.getElementById("movie-card");
console.log(card);
var currPage = 1;
var movie=[];
var favMovies=[];
async function movieList(currPage){
const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=${currPage}`);
const data = await response.json();
movie = data.results;
console.log(movie);
fetchMovies(movie);
}
function fetchMovies(movies){
        card.innerHTML="";
        movies.forEach((element) => {
        // console.log(element);
        const list = document.createElement("li");
        list.classList.add("movie-list");
        const imgUrl = `https://image.tmdb.org/t/p/original/${element.poster_path}`;
        list.innerHTML  = `
                          <img src= "${imgUrl}"/>
                          <h3>${element.title || "movie-title"}</h3>
                          <button class="heart-button" id ="heart-icon">&#10084</button>
                           <span>Votes:${element.vote_count || "vote-count"}</span>
                           <p>Rating:${element.vote_average || "vote-average"}</P>
                           `;                           
                           const heartIcon = list.querySelector('#heart-icon');
                             
                            // console.log(heartIcon);
                            heartIcon.addEventListener("click", ()=>{
                                if (heartIcon.style.color === '') {
                                    heartIcon.style.color = 'red';
                                    saveToFavourites(element);
                                } else {
                                    heartIcon.style.color = '';
                                    removeFromFav(element);
                                }

                            })
                                                             
                           card.appendChild(list);
                           
    });    
      
}
function saveToFavourites(movies){
    favMovies.push(movies);
    localStorage.setItem("favourites",JSON.stringify(favMovies));
    console.log(favMovies);
}
function removeFromFav(movies){
    favMovies.splice(movies.index,1);
    localStorage.setItem("favourites",JSON.stringify(favMovies));
    console.log(favMovies);
}

function sortByDate(){
    movie.sort(function(a,b){
    let ad = new Date(a.release_date);
    let bd = new Date(b.release_date);
    return ad-bd});
    movie.forEach((m)=>{
        // console.log(m.title,m.release_date)
    })
    fetchMovies(movie);
}
function sortByRating(){
    // console.log(movie);
    movie.sort(function(a,b)
    {return a.vote_average - b.vote_average});
    // console.log(movie);
    fetchMovies(movie);
}
function dispFavorite(){
    fetchMovies(favMovies);
}

document.getElementById("movie-name").addEventListener("input", (event)=> {
    const searchWord = event.target.value.toLowerCase();
    // console.log(searchWord);
    const searchedMovie = movie.filter(movies=>
        movies.title.toLowerCase().includes(searchWord)
    );
    // console.log(searchedMovie);
    document.getElementById("searchBtn").addEventListener("click",()=>{
        fetchMovies(searchedMovie);
    });    
})
movieList();
