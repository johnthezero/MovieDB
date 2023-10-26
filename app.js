let swiper1 = new Swiper(".one", {
  slidesPerView: 4,
  spaceBetween: 20,
  navigation: {
    nextEl: ".nextone",
    prevEl: ".prevone",
  },
});
let swiper2 = new Swiper(".two", {
  slidesPerView: 4,
  spaceBetween: 20,
  navigation: {
    nextEl: ".nexttwo",
    prevEl: ".prevtwo",
  },
});
let swiper3 = new Swiper(".three", {
  slidesPerView: 4,
  spaceBetween: 20,
  navigation: {
    nextEl: ".nextthree",
    prevEl: ".prevthree",
  },
});
/////////////   MODAL   ////////////////
let signin = document.querySelector("#signin");
signin.addEventListener("click", () => {
  document.querySelector(".modal-signup").showModal();
});
let register = document.querySelector("#register");
register.addEventListener("click", () => {
  document.querySelector(".modal-signup").showModal();
});
let movieModal = document.querySelector(".modal-movie");
let test = document.querySelector(".swiper-slide");
test.addEventListener("click", () => {
  movieModal.showModal();
});

/////////////////SEARCH/////////////

const movieSearchInput = document.querySelector(
  '.moviesearch input[type="text"]'
);
const searchBtn = document.querySelector(".open-modal");

const swiperWrappers = document.querySelectorAll(".swiper-wrapper");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjRhZDExZWZhZmZmZTRiZmNhNmYzODkzNDMxNWZiOSIsInN1YiI6IjY1MzUwZWE3YzE0ZmVlMDExZGU3ZmE0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yc1D0lWSGabi-HolSb6b9P3FUqCA2Pj9ukPp3wvJp1s",
  },
};

const openModalFilmInfo = (film) => {
  console.log(film);
};

const searchFilmByName = () => {
  if (movieSearchInput.value.trim() == "") return;

  let searchValue = movieSearchInput.value;
  /////clean/////
  movieSearchInput.value = "";
  ///////////

  console.log("hi");

  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchValue}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      let firstSwiper = swiperWrappers[0];
      /////clean/////
      firstSwiper.innerHTML = "";
      /////////
      if (response.results) {
        response.results.forEach((film) => {
          if (film.poster_path) {
            let img = `https://image.tmdb.org/t/p/w500/${film.poster_path}`;

            let swiperSlideEl = document.createElement("div");
            swiperSlideEl.classList.add("swiper-slide");
            let imgEl = document.createElement("img");
            imgEl.src = `${img}`;
            imgEl.alt = film.title;
            swiperSlideEl.appendChild(imgEl);
            firstSwiper.appendChild(swiperSlideEl);

            swiperSlideEl.addEventListener("click", () =>
              openModalFilmInfo(film)
            );
            swiper1.update();
          } else {
            console.log(film.title);
          }
        });
      } else {
        console.log("No results found.");
      }
    })
    .catch((err) => console.error(err));
};

searchBtn.addEventListener("click", searchFilmByName);

/////////////Latest releases////////
const loadLatestMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?`,
      options
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log(data);

    let secondSwiper = swiperWrappers[1];
    secondSwiper.innerHTML = "";

    if (data.results) {
      let maxNumOfFilm = 0;
      while (maxNumOfFilm <= 20) {
        maxNumOfFilm++;
        data.results.forEach((film) => {
          let img = `https://image.tmdb.org/t/p/w500/${film.poster_path}`;

          let swiperSlideEl = document.createElement("div");
          swiperSlideEl.classList.add("swiper-slide");
          let imgEl = document.createElement("img");
          imgEl.src = img;
          imgEl.alt = film.title;
          swiperSlideEl.appendChild(imgEl);
          secondSwiper.appendChild(swiperSlideEl);

          swiper2.update();
        });
      }
    } else {
      console.log("No results");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

document.addEventListener("DOMContentLoaded", loadLatestMovies);

////////////GENRE ID//////////

const genreId = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

////////////GENRE//////////

const loadMoviesGenre = async (genreName = "comedy") => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=&language=en-US&query=${genreName}&page=1&include_adult=false`,
      options
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log(data);

    let thirdSwiper = swiperWrappers[2];
    thirdSwiper.innerHTML = "";

    if (data.results) {
      let maxNumOfFilm = 0;
      while (maxNumOfFilm <= 20) {
        maxNumOfFilm++;
        data.results.forEach((film) => {
          let img = `https://image.tmdb.org/t/p/w500/${film.poster_path}`;

          let swiperSlideEl = document.createElement("div");
          swiperSlideEl.classList.add("swiper-slide");
          let imgEl = document.createElement("img");
          imgEl.src = img;
          imgEl.alt = film.title;
          swiperSlideEl.appendChild(imgEl);
          thirdSwiper.appendChild(swiperSlideEl);

          swiper3.update();
        });
      }
    } else {
      console.log("No results");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
document.addEventListener("DOMContentLoaded", loadMoviesGenre);

///////////CLICK ON LIST OF GENRES////////////////
const genres = document.querySelectorAll(".genre-list a");

genres.forEach((genre) => {
  genre.addEventListener("click", (e) => {
    e.preventDefault();
    const genreName = e.target.textContent.toLowerCase();
    loadMoviesGenre(genreName);
  });
});
