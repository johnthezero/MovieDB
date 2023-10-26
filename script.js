
let results_images=[];
let results=[];
let latest_images=[];
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjNiZTFjMzE3YzVmOTRlMDkxM2JhMjY5ZmIyNDMzYSIsInN1YiI6IjY1MzI4MjkyNDgxMzgyMDBhYzNhM2JkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Kvk9AO09LcR0Ewg8zaZMk5y_MR8pztqpSc2ADHcGr-w'
  }
};
/* let dateNow=new Date();
let dateBefore=new Date(dateNow-30);
console.log(`${dateNow.getFullYear()}-${dateNow.getMonth()}-${dateNow.getDay()}`); */


let swiper1=new Swiper(".one",{
  slidesPerView : 4 ,
  spaceBetween : 20,
  navigation : {
    nextEl : ".nextone",
    prevEl : ".prevone",
  },
});
let swiper2=new Swiper(".two",{
  slidesPerView : 4 ,
  spaceBetween : 20,
  navigation : {
    nextEl : ".nexttwo",
    prevEl : ".prevtwo",
  },
});
let swiper3=new Swiper(".three",{
  slidesPerView : 4 ,
  spaceBetween : 20,
  navigation : {
    nextEl : ".nextthree",
    prevEl : ".prevthree",
  },
});

let signin=document.querySelector("#signin");
signin.addEventListener("click",()=>{
  document.querySelector(".modal-signup").showModal();
});
let register=document.querySelector("#register");
register.addEventListener("click",()=>{
  document.querySelector(".modal-signup").showModal();
});
let movieModal=document.querySelector(".modal-movie");
let test=document.querySelector(".swiper-slide");

test.addEventListener("click",()=>{
  movieModal.showModal();
});

let input=document.querySelector("input");
let search=document.querySelector(".searchbutton");
search.addEventListener("click",()=>{
  console.log("input value : "+input.value);
    fetchTitle(input.value);
});
 async function fetchTitle(title){
  let data=[];
  try{
    clearResults();
    let response= await fetch(`https://api.themoviedb.org/3/search/movie?api_key=6b3be1c317c5f94e0913ba269fb2433a&query=${title}`);
    data=await response.json();
    console.log(data);
    getCurrentData(data);
    displayMovies(results_images,document.querySelector(".result-container"),swiper1);
  }catch(err){
    console.log(err);
  }
 }
function getCurrentData(data){
  data.results.forEach(element => {
    
    if(element.poster_path){
      results_images.push(`https://images.tmdb.org/t/p/original/${element.poster_path}`);
    }
    
    console.log("title : "+element.title);
    console.log("path : "+`https://images.tmdb.org/t/p/original/`+`${element.poster_path}`);
  });
}
function clearResults(){
    results.length=0;
    results_images.length=0;
    let res=document.querySelector(".result-container");
    res.innerHTML="";
}
function clearLatests(){
    results.length=0;
    results_images.length=0;
    let res=document.querySelector(".latests-container");
    res.innerHTML="";
}
function clearGenres(){
    results.length=0;
    results_images.length=0;
    let res=document.querySelector(".genres-container");
    res.innerHTML="";
}


function displayMovies(moviesURL,container,swiper){
  moviesURL.forEach((elementURL)=>{
    let slide=document.createElement("div");
    slide.classList.add("swiper-slide");
    let img=document.createElement("img");
    if(elementURL){
      img.src=elementURL;
    }else{
      img.src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png";
    }
    slide.appendChild(img);
    container.appendChild(slide);
    
  });
  swiper.update();
}
async function displayLatests(){
  
  clearLatests();
  let dateNow=new Date(Date.now());
  console.log(dateNow);
  
  
  let dateBefore=new Date(dateNow.getFullYear(),dateNow.getMonth(),dateNow.getDay()-30);
  console.log(dateBefore);
  try{
    let response= await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=6b3be1c317c5f94e0913ba269fb2433a&primary_release_date.gte=${dateBefore.getTime()}`); //&primary_release_date.lte=${dateNow.getTime()}
    let data=await response.json();
   /*  data.results.forEach((element)=>{
        latest_images.push(element.)
    }); */
    console.log(data);
    getCurrentData(data);
    displayMovies(results_images,document.querySelector(".latests-container"),swiper2);
  
  }catch(err){
    console.log(err);
  }
  
}
displayLatests();

async function displayByGenre(){
  let data=[];
    clearGenres();
  try{
    let response= await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=6b3be1c317c5f94e0913ba269fb2433a&with_genres=action`);
    data=await response.json();
    getCurrentData(data);
    console.log("display genre");
    displayMovies(results_images,document.querySelector(".genres-container"),swiper3);
  
  }catch(err){
    console.log(err);
  }
  
}
displayByGenre();